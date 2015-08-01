import cleanText from "./clean-text";
import toFunctionCall from "./ast/to-function-call";
import injectRenderArbitrary from "./runtime/render-arbitrary";

// Filters out empty children, and transform JSX expressions
// into function calls.
export default function buildChildren(t, scope, file, children) {
  let renderArbitraryRef;
  let childrenDeclarations = [];

  children = children.reduce((children, child) => {
    const wasExpressionContainer = t.isJSXExpressionContainer(child);
    if (wasExpressionContainer) {
      child = child.expression;
    }

    if (t.isJSXEmptyExpression(child)) { return children; }

    if (t.isLiteral(child)) {
      let type = typeof child.value;
      let value = child.value;
      if (type === "string") {
        value = cleanText(value);
        if (!value) { return children; }
      }

      if (type === "string" || type === "number") {
        child = toFunctionCall(t, "text", [t.literal(value)]);
      }
    } else if (wasExpressionContainer && t.isExpression(child)) {
      renderArbitraryRef = renderArbitraryRef || injectRenderArbitrary(t, file);
      const ref = scope.generateUidIdentifierBasedOnNode(child);
      childrenDeclarations.push(t.variableDeclarator(ref, child));
      child = toFunctionCall(t, renderArbitraryRef, [ref]);
    }

    children.push(child);
    return children;
  }, []);

  if (childrenDeclarations.length) {
    childrenDeclarations = [t.variableDeclaration("var", childrenDeclarations)];
  }

  return { children, childrenDeclarations };
}
