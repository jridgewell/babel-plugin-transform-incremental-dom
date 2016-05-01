import * as t from "babel-types";

const memberExpressionSplitter = /\./g;

// Helper to transform a JSX identifier into a normal reference.
export default function toReference(node, identifier = false) {
  if (typeof node === "string") {
    if (memberExpressionSplitter.test(node)) {
      return node.
        split(memberExpressionSplitter).
        map((s) => t.identifier(s)).
        reduce((obj, prop) => t.memberExpression(obj, prop));
    }

    return t.identifier(node);
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
