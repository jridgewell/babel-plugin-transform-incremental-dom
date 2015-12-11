import cleanText from "./clean-text";
import toFunctionCall from "./ast/to-function-call";
import injectRenderArbitrary from "./runtime/render-arbitrary";
import iDOMMethod from "./idom-method";
import isLiteralOrUndefined from "./ast/is-literal-or-undefined";

// Filters out empty children, and transform JSX expressions
// into function calls.
export default function buildChildren(t, scope, file, children, { eager }) {
  let renderArbitraryRef;
  const eagerChildren = [];

  children = children.reduce((children, child) => {
    const wasInExpressionContainer = child.isJSXExpressionContainer();
    if (wasInExpressionContainer) {
      child = child.get("expression");
    }
    const isJSXText = child.isJSXText();

    if (child.isJSXEmptyExpression()) { return children; }
    child = child.node;

    if (isLiteralOrUndefined(t, child) || isJSXText) {
      let value = child.value;
      const type = typeof value;

      if (type === "string") {
        value = cleanText(value);
        if (!value) { return children; }
      }

      if (type === "string" || type === "number") {
        child = toFunctionCall(t, iDOMMethod(file, "text"), [t.stringLiteral("" + value)]);
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
