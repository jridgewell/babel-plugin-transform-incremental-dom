import expressionExtractor from "./extract-expressions";
import * as t from "babel-types";

// Take single use variable declarations and move them inside
// the JSX Expression Container where they are referenced.
const expressionInliner = {
  JSXExpressionContainer(path) {
    const expression = path.get("expression");
    if (!expression.isIdentifier()) {
      return;
    }

    const binding = path.scope.getBinding(expression.node.name);
    if (!binding || binding.references > 1 || !binding.constant) {
      return;
    }

    const declarator = binding.path;
    if (!declarator.isVariableDeclarator()) {
      return;
    }

    const init = declarator.get("init");
    if (!init.isJSXElement()) {
      return;
    }

    const closureVars = [];
    const state = Object.assign({}, this, {
      closureVarsStack: [closureVars]
    });
    init.traverse(expressionExtractor, state);

    expression.replaceWith(init.node);
    declarator.replaceWithMultiple(closureVars.map((cv) => {
      return t.variableDeclarator(cv.id, cv.init);
    }));
  }
};

export default expressionInliner;
