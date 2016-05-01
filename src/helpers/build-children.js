import cleanText from "./clean-text";
import toFunctionCall from "./ast/to-function-call";
import injectRenderArbitrary from "./runtime/render-arbitrary";
import iDOMMethod from "./idom-method";
import isLiteralOrUndefined from "./is-literal-or-undefined";
import * as t from "babel-types";

// Transforms the children into an array of iDOM function calls
export default function buildChildren(children, plugin) {
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

      // Clean up the text, so we don't have to have multiple TEXT nodes.
      if (type === "string") {
        if (!wasInExpressionContainer) { value = cleanText(value); }
        if (!value) { return children; }
      }

      // Only strings and numbers will print, anything else is skipped.
      if (type === "string" || type === "number") {
        node = toFunctionCall(iDOMMethod("text", plugin), [t.stringLiteral("" + value)]);
      } else {
        return children;
      }
    } else if (wasInExpressionContainer && !replacedElements.has(node)) {
      // Arbitrary expressions, e.g. variables, need to be inspected at runtime
      // to determine how to render them.
      renderArbitraryRef = renderArbitraryRef || injectRenderArbitrary(plugin);

      node = toFunctionCall(renderArbitraryRef, [node]);
    }

    children.push(node);
    return children;
  }, []);

  return children;
}
