import isLiteralOrUndefined from "./ast/is-literal-or-undefined";

const expressionExtractor = {
  JSXSpreadAttribute: {
    enter(path) {
      const argument = path.get("argument");
      const node = argument.node;
      let ref = node;
      if (!argument.isIdentifier()) {
        ref = path.scope.generateUidIdentifierBasedOnNode(node);
      }

      this.closureVars.push({ param: ref, arg: node });
      argument.replaceWith(ref);
    }
  },

  JSXExpressionContainer: {
    enter(path) {
      const expression = path.get("expression");
      const node = expression.node;

      // If the variable is constant (or will be wrapped), don't extract.
      if (isLiteralOrUndefined(expression) || expression.isJSXElement()) {
        return;
      }

      let ref = node;
      if (!expression.isIdentifier()) {
        ref = path.scope.generateUidIdentifierBasedOnNode(node);
      }

      this.closureVars.push({ param: ref, arg: node });
      expression.replaceWith(ref);
    }
  }
};

export default expressionExtractor;
