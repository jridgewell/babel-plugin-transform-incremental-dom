import * as t from "babel-types";

// Literals and `undefined` are treated as constant values in attributes and
// children.
export default function isLiteralOrSpecial(path) {
  return isLiteralOrSpecialNode(path.node);
}

export function isLiteralOrSpecialNode(node) {
  if (t.isTemplateLiteral(node)) {
    return node.expressions.every(isLiteralOrSpecialNode);
  }
  return t.isLiteral(node) ||
    t.isUnaryExpression(node, { operator: "void" }) ||
    t.isIdentifier(node, { name: "undefined" }) ||
    t.isIdentifier(node, { name: "NaN" }) ||
    t.isIdentifier(node, { name: "Infinity" });
}
