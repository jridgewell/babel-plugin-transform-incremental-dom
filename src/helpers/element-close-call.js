import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";
import isComponent from "./is-component";
import { hasSpread, hasSkip } from "./attributes";

// Returns the closing element's function call.
export default function elementCloseCall(path, plugin) {
  const { node } = path;

  const attributes = path.get("attributes");
  // Self closing elements that do not contain a SpreadAttribute will use `elementVoid`,
  // so the closing `elementClose` is not needed.
  if (node.selfClosing && !hasSpread(attributes) && !hasSkip(attributes, plugin)) {
    return null;
  }

  const name = path.get("name");
  const useReference = isComponent(name, plugin);
  return toFunctionCall(iDOMMethod("elementClose", plugin), [toReference(name.node, useReference)]);
}
