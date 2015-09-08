// Helper to transform a JSX identifier into a normal reference.
export default function toReference(t, node, identifier = false) {
  if (typeof node === "string") {
    return t.identifier(node);
  }
  if (t.isJSXIdentifier(node)) {
    return identifier ? t.identifier(node.name) : t.literal(node.name);
  }
  if (t.isJSXMemberExpression(node)) {
    return t.memberExpression(
      toReference(t, node.object, true),
      toReference(t, node.property, true)
    );
  }
  return node;
}
