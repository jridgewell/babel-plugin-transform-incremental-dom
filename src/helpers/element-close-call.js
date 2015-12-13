import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";

export default function elementCloseCall(t, path, plugin) {
  const node = path.node;
  if (node.selfClosing) {
    const hasSpread = path.get("attributes").some((attr) => attr.isJSXSpreadAttribute());
    if (!hasSpread) {
      return null;
    }
  }
  return toFunctionCall(t, iDOMMethod("elementClose", plugin), [toReference(t, node.name)]);
}
