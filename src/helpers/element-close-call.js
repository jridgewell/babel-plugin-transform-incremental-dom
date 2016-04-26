import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";
import isComponent from "./is-component";

// Returns the closing element's function call.
export default function elementCloseCall(t, path, plugin, { components }) {
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

  const useReference = isComponent(node.name.name) && components;
  return toFunctionCall(t, iDOMMethod("elementClose", plugin), [toReference(t, node.name, useReference)]);
}
