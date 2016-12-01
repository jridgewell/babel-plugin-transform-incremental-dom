import isLiteralOrSpecial from "./is-literal-or-special";
import * as t from "babel-types";

function addClosureVar(expression, closureVars) {
  const init = expression.node;
  const id = expression.scope.generateUidIdentifierBasedOnNode(init);

  closureVars.push({ id, init });
  return id;
}

function last(array) {
  return array[array.length - 1];
}

const collectDeferrables = {
  CallExpression(path) {
    if (deferrable(path)) {
      const args = path.node.arguments;

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
    const id = addClosureVar(argument, last(closureVarsStack));
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
      expression.replaceWith(addClosureVar(expression, closureVars));
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
      expression.replaceWith(addClosureVar(expression, closureVars));
      return;
    }

    const everyBranchHasCall = deferred.length >= branches;
    const onlyOneArg = deferredArgsLength === 1;
    let deferredId = path.scope.generateUidIdentifier("deferred");
    let argId;
    let branchId;

    if (deferredArgsLength) {
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
      let init;
      if (onlyOneArg) {
        init = deferredArgs[0][0];
      } else {
        init = deferredArgs.map((args) => t.arrayExpression(args));
        init = init.reduceRight((conditional, args, i) => {
          if (!branchId || args.elements.length === 0) {
            return conditional;
          }

          return t.conditionalExpression(
            t.binaryExpression("==", branchId, t.numericLiteral(i + 1)),
            args,
            conditional
          );
        });
      }
      // If no branch "won", we need to evaluate to something else.
      if (!everyBranchHasCall) {
        init = t.conditionalExpression(
          t.binaryExpression("==", branchId, t.numericLiteral(0)),
          t.nullLiteral(),
          init
        );
      }
      closureVars.push({ id: argId, init });
    }

    // Now, push the branching identifier.
    if (branchId) {
      closureVars.push({ id: branchId, init: branchId });
    }

    // Finally, transform the calls into their evaluted "contex" form.
    const evaluatedBranches = calls.map((struct) => {
      const { node, isMemberExpression } = struct;

      // This reverses the context transform done earlier.
      if (isMemberExpression) {
        node.callee.object = deferredId;
      } else {
        node.callee = deferredId;
      }

      // Any arguments are now passed through the evaluated args array.
      // TODO: Allow literals inline, instead of evaluating them in the array.
      node.arguments = node.arguments.map((arg, i) => {
        if (onlyOneArg) {
          return argId;
        }

        return t.memberExpression(
          argId,
          t.numericLiteral(i),
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
