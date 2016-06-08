import isLiteralOrSpecial from "./is-literal-or-special";

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
    addClosureVar(expression, last(closureVarsStack));
  }
};

export default expressionExtractor;
