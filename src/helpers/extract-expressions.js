import isLiteralOrSpecial from "./is-literal-or-special";
import { wrappedJSXCalls } from "./wrap-jsx-calls";

function addClosureVar(expression, closureVars) {
  const init = expression.node;
  const id = expression.scope.generateUidIdentifierBasedOnNode(init);

  closureVars.push({ id, init });
  expression.replaceWith(id);
}

function last(array) {
  return array[array.length - 1];
}

// Extracts variable expressions into an array of closure parameters,
// so that when the closure is finally evaluated, it will have the correct
// values.
const expressionExtractor = {
  JSXSpreadAttribute(path) {
    const { closureVarsStack } = this;
    addClosureVar(path.get("argument"), last(closureVarsStack));
  },

  JSXExpressionContainer(path) {
    const expression = path.get("expression");
    // If the variable is constant (or will be wrapped), don't extract.
    if (isLiteralOrSpecial(expression) || expression.isJSXElement()) {
      return;
    }

    const { closureVarsStack } = this;
    const closureVars = last(closureVarsStack);

    // Certain calls are actually JSX returning functions. If we find one,
    // let's not create a closure for it here, but let it get wrapped in the
    // closure we're already creating.
    if (expression.isCallExpression()) {
      const callee = expression.get("callee");
      if (wrappedJSXCalls.has(callee)) {
        wrappedJSXCalls.delete(callee)
        const args = expression.get("arguments");

        args.forEach((arg) => {
          if (isLiteralOrSpecial(arg) || arg.isJSXElement()) {
            return;
          }

          addClosureVar(arg, closureVars);
        });
        return;
      }
    }

    addClosureVar(expression, closureVars);
  }
};

export default expressionExtractor;
