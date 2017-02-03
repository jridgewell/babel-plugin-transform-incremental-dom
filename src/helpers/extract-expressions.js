import isLiteralOrSpecial, { isLiteralOrSpecialNode } from "./is-literal-or-special";
import last from "./last";
import * as t from "babel-types";

function addClosureVar(expression, closureVars, defaultName) {
  const init = expression.node;
  const id = expression.scope.generateUidIdentifierBasedOnNode(init, defaultName);

  closureVars.push({ id, init });
  return id;
}

const collectDeferrables = {
  CallExpression(path) {
    if (deferrable(path)) {
      const args = path.get("arguments").reduce((args, arg) => {
        if (!(isLiteralOrSpecial(arg) || arg.isJSXElement())) {
          args.push(arg.node);
        }

        return args;
      }, []);

      this.deferred.push(path);
      this.deferredArgs.push(args);
      this.deferredArgsLength += args.length;
    }
  },

  LogicalExpression() {
    this.branches += 2;
  },

  ConditionalExpression() {
    this.branches += 2;
  },

  Function(path) {
    path.skip();
  }
};


function deferrable(ancestor) {
  let last;
  while ((last = ancestor, ancestor = ancestor.parentPath)) {
    if (ancestor.isJSXElement()) {
      return true;
    }

    if (ancestor.isSequenceExpression()) {
      const expressions = ancestor.get("expressions");
      if (expressions[expressions.length - 1] !== last) {
        return false;
      }
    } else if (ancestor.isConditionalExpression()) {
      if (last.key === "test") {
        return false;
      }
    } else if (ancestor.isLogicalExpression()) {
      if (ancestor.get("left") === last) {
        return false;
      }
    } else if (!ancestor.isJSX()) {
      return false;
    }
  }
}

// Extracts variable expressions into an array of closure parameters,
// so that when the closure is finally evaluated, it will have the correct
// values.
const expressionExtractor = {
  JSXSpreadAttribute(path) {
    const { closureVarsStack } = this;
    const argument = path.get("argument");
    const id = addClosureVar(argument, last(closureVarsStack), "spread");
    argument.replaceWith(id)
  },

  JSXExpressionContainer(path) {
    const expression = path.get("expression");
    // If the variable is constant (or will be wrapped), don't extract.
    if (isLiteralOrSpecial(expression) || expression.isJSXElement()) {
      return;
    }

    const closureVars = last(this.closureVarsStack);

    // Only call defer JSX Children Expressions
    if (!path.parentPath.isJSXElement()) {
      expression.replaceWith(addClosureVar(expression, closureVars, path.parentPath.node.name.name));
      return;
    }

    // Grab all our deferrable calls
    const state = Object.assign({}, this, {
      branches: 0,
      deferred: [],
      deferredArgs: [],
      deferredArgsLength: 0,
    });
    path.traverse(collectDeferrables, state);
    const { deferred, deferredArgs, deferredArgsLength, branches } = state;

    // Exit early if there's nothing to defer.
    if (deferred.length === 0) {
      expression.replaceWith(addClosureVar(expression, closureVars, "child"));
      return;
    }

    const everyBranchHasCall = deferred.length >= branches;
    let deferredId = path.scope.generateUidIdentifier("deferred");
    let argId;
    let branchId;

    if (deferredArgsLength > 0) {
      argId = path.scope.generateUidIdentifier("args");
    }
    if (branches > 0) {
      branchId = path.scope.generateUidIdentifier("b");
      path.scope.push({ id: branchId, init: t.numericLiteral(0) });
    } else if (deferred.length > 1) {
      throw expression.buildCodeFrameError("No branches?");
    }

    // Map our deferred calls into their important information
    const calls = deferred.map((path, i) => {
      const { node } = path;
      const callee = path.get("callee");
      const isMemberExpression = callee.isMemberExpression();

      // Transform our calls into their context. For normal calls, it's just the
      // function reference. For member expressions (`obj.fn()`), it's the `obj`.
      // We'll invoke the function properly later on.
      let context = isMemberExpression ? callee.node.object : callee.node;
      if (branches > 0) {
        context = t.sequenceExpression([
          t.assignmentExpression("=", branchId, t.numericLiteral(i + 1)),
          context
        ]);
      }
      path.replaceWith(context);

      return {
        node,
        isMemberExpression,
      }
    });

    // Now push the transformed expression into our closure variables.
    // This node has all the deferrable calls remapped into their contexts,
    // and won't actually invoke them.
    closureVars.push({ id: deferredId, init: expression.node });

    // Now that we've evaluated the expression, we need to evaluate the arguments
    // to the deferred call that "won", if any did.
    if (argId) {
      let init = deferredArgs.map((args) => {
        const { length } = args;
        return length === 0 ? null : length === 1 ? args[0] : t.arrayExpression(args);
      }).reduceRight((conditional, args, i) => {
        if (!args) {
          return conditional;
        }

        if (!branchId) {
          return args;
        }

        return t.conditionalExpression(
          t.binaryExpression("==", branchId, t.numericLiteral(i + 1)),
          args,
          conditional
        );
      }, t.nullLiteral());
      closureVars.push({ id: argId, init });
    }

    // Now, push the branching identifier.
    if (branchId) {
      closureVars.push({ id: branchId, init: branchId });
    }

    // Finally, transform the calls into their evaluted "contex" form.
    const evaluatedBranches = calls.map((struct, i) => {
      const { node, isMemberExpression } = struct;

      // This reverses the context transform done earlier.
      if (isMemberExpression) {
        node.callee.object = deferredId;
      } else {
        node.callee = deferredId;
      }

      // Any arguments are now passed through the evaluated args array.
      let index = 0;
      const deferredArgsLength = deferredArgs[i].length;
      node.arguments = node.arguments.map((arg) => {
        if (isLiteralOrSpecialNode(arg)) {
          return arg;
        }

        if (deferredArgsLength === 1) {
          return argId;
        }

        return t.memberExpression(
          argId,
          t.numericLiteral(index++),
          true
        );
      });

      return node;
    });
    let evaluated = evaluatedBranches.reduceRight((conditional, node, i) => {
      if (!branchId) {
        return node;
      }

      return t.conditionalExpression(
        t.binaryExpression("==", branchId, t.numericLiteral(i + 1)),
        node,
        conditional
      );
    });
    // If not every branch leads to a deferred call, we need to render the
    // evaluated result. Ie. `1 || <div />` needs to render the `1`.
    if (!everyBranchHasCall) {
      evaluated = t.conditionalExpression(
        t.binaryExpression("==", branchId, t.numericLiteral(0)),
        deferredId,
        evaluated
      );
    }
    expression.replaceWith(evaluated);
  }
};

export default expressionExtractor;
