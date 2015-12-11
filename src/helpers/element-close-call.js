import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";

export default function elementCloseCall(t, path, file) {
  const node = path.node;
  if (!node) { return null; }
  return toFunctionCall(t, iDOMMethod(file, "elementClose"), [toReference(t, node.name)]);
}
