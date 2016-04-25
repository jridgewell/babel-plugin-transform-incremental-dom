import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";

// Returns the closing element's function call.
export default function elementCloseCall(t, path, plugin, { componentAsReference }) {
  const node = path.node;

  // Self closing elements may not need a closing element.
  if (node.selfClosing) {
    const hasSpread = path.get("attributes").some((attr) => attr.isJSXSpreadAttribute());

    // Self closing elements that do not contain a SpreadAttribute will use `elementVoid`,
    // so the closing `elementClose` is not needed.
    if (!hasSpread) {
      return null;
    }
  }

  const isComponent = /^[A-Z]/.test(node.name.name);
  return toFunctionCall(t, iDOMMethod("elementClose", plugin), [toReference(t, node.name, isComponent && componentAsReference)]);
}
