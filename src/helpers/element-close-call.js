import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";
import isComponent from "./is-component";
import { hasSpread } from "./attributes";

// Returns the closing element's function call.
export default function elementCloseCall(t, path, plugin) {
  const node = path.node;

  // Self closing elements that do not contain a SpreadAttribute will use `elementVoid`,
  // so the closing `elementClose` is not needed.
  if (node.selfClosing && !hasSpread(path.get("attributes"))) {
    return null;
  }

  const useReference = isComponent(node, plugin);
  return toFunctionCall(t, iDOMMethod("elementClose", plugin), [toReference(t, node.name, useReference)]);
}
