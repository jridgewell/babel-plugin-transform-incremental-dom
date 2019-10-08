import * as t from "@babel/types";

// Helper to transform a JSX identifier into a normal reference.
export default function toReference(node, identifier = false) {
  if (typeof node === "string") {
    return node.
      split(".").
      map((s) => t.identifier(s)).
      reduce((obj, prop) => t.memberExpression(obj, prop));
  }

  if (t.isJSXIdentifier(node)) {
    return identifier ? t.identifier(node.name) : t.stringLiteral(node.name);
  }

  if (t.isJSXMemberExpression(node)) {
    return t.memberExpression(
      toReference(node.object, true),
      toReference(node.property, true)
    );
  }

  return node;
}
