export default function getIdentifier(t, node) {
  if (t.isLiteral(node)) { return null; }
  if (t.isIdentifier(node)) { return node; }
  if (t.isMemberExpression(node)) { return node.object; }
}
