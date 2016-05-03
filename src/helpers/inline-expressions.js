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

    const closureVars = [];
    declarator.traverse(expressionExtractor, { closureVarsStack: [closureVars] });

    expression.replaceWith(declarator.node.init || t.unaryExpression("void", t.numericLiteral(0)));
    if (closureVars.length) {
      declarator.replaceWithMultiple(closureVars.map((cv) => {
        return t.variableDeclarator(cv.id, cv.init);
      }));
    } else {
      declarator.remove()
    }
  }
};

export default expressionInliner;
