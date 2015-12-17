import cleanText from "./clean-text";
import toFunctionCall from "./ast/to-function-call";
import injectRenderArbitrary from "./runtime/render-arbitrary";
import iDOMMethod from "./idom-method";
import isLiteralOrUndefined from "./ast/is-literal-or-undefined";

// Filters out empty children, and transform JSX expressions
// into function calls.
export default function buildChildren(t, children, plugin) {
  let renderArbitraryRef;
  const { replacedElements } = plugin;

  children = children.reduce((children, child) => {
    const wasInExpressionContainer = child.isJSXExpressionContainer();
    if (wasInExpressionContainer) {
      child = child.get("expression");
    }

    if (child.isJSXEmptyExpression()) { return children; }
    let node = child.node;

    if (child.isJSXText() || isLiteralOrUndefined(child)) {
      let value = node.value;
      const type = typeof value;

      if (type === "string") {
        value = cleanText(value);
        if (!value) { return children; }
      }

      if (type === "string" || type === "number") {
        node = toFunctionCall(t, iDOMMethod("text", plugin), [t.stringLiteral("" + value)]);
      } else {
        return children;
      }
    } else if (wasInExpressionContainer && !replacedElements.has(node)) {
      renderArbitraryRef = renderArbitraryRef || injectRenderArbitrary(t, plugin);

      node = toFunctionCall(t, renderArbitraryRef, [node]);
    }

    children.push(node);
    return children;
  }, []);

  return children;
}
