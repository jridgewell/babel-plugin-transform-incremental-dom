import cleanText from "./clean-text";
import toFunctionCall from "./ast/to-function-call";
import injectRenderArbitrary from "./runtime/render-arbitrary";
import iDOMMethod from "./idom-method";
import isLiteralOrUndefined from "./ast/is-literal-or-undefined";

// Filters out empty children, and transform JSX expressions
// into function calls.
export default function buildChildren(t, scope, plugin, children, { eager }) {
  let renderArbitraryRef;
  const eagerChildren = [];

  children = children.reduce((children, child) => {
    const wasInExpressionContainer = child.isJSXExpressionContainer();
    if (wasInExpressionContainer) {
      child = child.get("expression");
    }

    if (child.isJSXEmptyExpression()) { return children; }
    const isJSXText = child.isJSXText();
    let node = child.node;

    if (isLiteralOrUndefined(t, node) || isJSXText) {
      let value = node.value;
      const type = typeof value;

      if (type === "string") {
        value = cleanText(value);
        if (!value) { return children; }
      }

      if (type === "string" || type === "number") {
        node = toFunctionCall(t, iDOMMethod("text", plugin), [t.stringLiteral("" + value)]);
      }
    } else if (wasInExpressionContainer && !node._iDOMwasJSX) {
      renderArbitraryRef = renderArbitraryRef || injectRenderArbitrary(t, plugin);

      if (eager && !scope.isStatic(node)) {
        const ref = scope.generateUidIdentifierBasedOnNode(node);
        eagerChildren.push({ ref, value: node });
        node = ref;
      }

      node = toFunctionCall(t, renderArbitraryRef, [node]);
    }

    children.push(node);
    return children;
  }, []);

  return { children, eagerChildren };
}
