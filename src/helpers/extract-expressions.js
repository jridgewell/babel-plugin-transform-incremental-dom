import isLiteralOrSpecial, { isLiteralOrSpecialNode } from "./is-literal-or-special";
import last from "./last";
import { getCompletionRecords } from "./completion-records";
import * as t from "babel-types";

function addClosureVar(expression, closureVars, defaultName) {
  const init = expression.node;
  const id = expression.scope.generateUidIdentifierBasedOnNode(init, defaultName);

  closureVars.push({ id, init });
  return id;
}


function deferrable(ancestor) {
  let child;
  while ((child = ancestor, ancestor = ancestor.parentPath)) {
    if (ancestor.isJSXElement()) {
      return true;
    }

    if (ancestor.isSequenceExpression()) {
      const expressions = ancestor.get("expressions");
      if (last(expressions) !== child) {
        return false;
      }
    } else if (ancestor.isConditionalExpression()) {
      if (child.key === "test") {
        return false;
      }
    } else if (ancestor.isLogicalExpression()) {
      if (ancestor.get("left") === child) {
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
    const { parentPath, scope } = path;

    // Only call defer JSX Children Expressions
    if (!parentPath.isJSXElement()) {
      expression.replaceWith(addClosureVar(expression, closureVars, parentPath.node.name.name));
      return;
    }

    const completions = getCompletionRecords(expression);
    const deferred = completions.filter((c) => {
      // `fn() && other` and `fn() || other` cannot be deferred.
      return c.key !== "left" && c.isCallExpression();
    });

    // Exit early if there's nothing to defer.
    if (deferred.length === 0) {
      expression.replaceWith(addClosureVar(expression, closureVars, "child"));
      return;
    }

    const everyBranchHasCall = deferred.length >= completions.length;
    let deferredId = scope.generateUidIdentifier("deferred");
    let argId;
    let branchId;

    if (completions.length > 1) {
      branchId = scope.generateUidIdentifier("b");
      scope.push({ id: branchId, init: t.numericLiteral(0) });
    }

    // Map our deferred calls into their important information
    const calls = deferred.map((call, i) => {
      const { node } = call;
      const callee = call.get("callee");
      const isMemberExpression = callee.isMemberExpression();

      // Transform our calls into their context. For normal calls, it's just the
      // function reference. For member expressions (`obj.fn()`), it's the `obj`.
      // We'll invoke the function properly later on.
      let context = isMemberExpression ? callee.node.object : callee.node;
      if (branchId) {
        context = t.sequenceExpression([
          t.assignmentExpression("=", branchId, t.numericLiteral(i + 1)),
          context
        ]);
      }

      call.replaceWith(context);

      return {
        node,
        isMemberExpression,
      }
    });

    // Now push the transformed expression into our closure variables.
    // This node has all the deferrable calls remapped into their contexts,
    // and won't actually invoke them.
    closureVars.push({ id: deferredId, init: expression.node });

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
      const args = [];
      const length = node.arguments.reduce((length, arg) => {
        if (isLiteralOrSpecialNode(arg) || t.isJSXElement(arg)) {
          return length;
        }
        return length + 1;
      }, 0);
      node.arguments = node.arguments.map((arg) => {
        if (isLiteralOrSpecialNode(arg) || t.isJSXElement(arg)) {
          return arg;
        }

        args.push(arg);

        if (!argId) {
          argId = scope.generateUidIdentifier("args");
        }

        if (length === 1) {
          return argId;
        }
        return t.memberExpression(
          argId,
          t.numericLiteral(index++),
          true
        );
      });

      return {
        node,
        args: length === 0 ? null : length === 1 ? args[0] : t.arrayExpression(args),
      };
    });

    let evaluated = everyBranchHasCall ? null : deferredId;
    let evaluatedArgs = t.nullLiteral();
    for (let i = evaluatedBranches.length - 1; i >= 0; i--) {
      const { node, args } = evaluatedBranches[i];
      if (args) {
        if (branchId) {
          evaluatedArgs = t.conditionalExpression(
            t.binaryExpression("==", branchId, t.numericLiteral(i + 1)),
            args,
            evaluatedArgs
          );
        } else {
          evaluatedArgs = args;
        }
      }

      if (evaluated) {
        evaluated = t.conditionalExpression(
          t.binaryExpression("==", branchId, t.numericLiteral(i + 1)),
          node,
          evaluated
        );
      } else {
        evaluated = node;
      }
    }

    if (argId) {
      closureVars.push({ id: argId, init: evaluatedArgs });
    }
    expression.replaceWith(evaluated);
  }
};

export default expressionExtractor;
