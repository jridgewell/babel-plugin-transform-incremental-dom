// Literals and `undefined` are treated as constant values in attributes and
// children.
export default function isLiteralOrUndefined(t, node) {
  return t.isLiteral(node) || (t.isIdentifier(node) && node.name === "undefined");
}
