// Literals and `undefined` are treated as constant values in attributes and
// children.
export default function isLiteralOrUndefined(path) {
  return path.isLiteral() ||
    path.isIdentifier({ name: "undefined" }) ||
    path.isUnaryExpression({ operator: "void" });
}
