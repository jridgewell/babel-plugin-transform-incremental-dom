import cleanText from "./clean-text";
import toFunctionCall from "./ast/to-function-call";
import injectRenderArbitrary from "./runtime/render-arbitrary";
import iDOMMethod from "./idom-method";

// Filters out empty children, and transform JSX expressions
// into function calls.
export default function buildChildren(t, scope, file, children, { eager }) {
  let renderArbitraryRef;
  const eagerChildren = [];

  children = children.reduce((children, child) => {
    const wasInExpressionContainer = t.isJSXExpressionContainer(child);
    if (wasInExpressionContainer) {
      child = child.expression;
    }

    if (t.isJSXEmptyExpression(child)) { return children; }

    if (t.isLiteral(child)) {
      const type = typeof child.value;
      let value = child.value;

      if (type === "string") {
        value = cleanText(value);
        if (!value) { return children; }
      }

      if (type === "string" || type === "number") {
        child = toFunctionCall(t, iDOMMethod(file, "text"), [t.literal(value)]);
      }
    } else if (wasInExpressionContainer && !child._iDOMwasJSX) {
      renderArbitraryRef = renderArbitraryRef || injectRenderArbitrary(t, file);

      if (eager) {
        const ref = scope.generateUidIdentifierBasedOnNode(child);
        eagerChildren.push(t.variableDeclarator(ref, child));
        child = ref;
      }

      child = toFunctionCall(t, renderArbitraryRef, [child]);
    }

    children.push(child);
    return children;
  }, []);

  return { children, eagerChildren };
}
