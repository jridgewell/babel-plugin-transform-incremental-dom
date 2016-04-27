// Take single use variable declarations and move them inside
// the JSX Expression Container where they are referenced.
const expressionInliner = {
  JSXExpressionContainer(path) {
    const expression = path.get("expression");
    if (!expression.isIdentifier()) {
      return;
    }
    const binding = path.scope.getBinding(expression.node.name);
    if (!binding || binding.references != 1) {
      return;
    }
    const declarator = binding.path;
    if (!declarator.isVariableDeclarator()) {
      return;
    }
    if (declarator.get("id") !== expression) {
      expression.replaceWith(declarator.node.init);
      declarator.remove()
    }
  }
};

export default expressionInliner;
