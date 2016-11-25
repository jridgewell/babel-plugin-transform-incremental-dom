import * as t from "babel-types";

// Helper to transform a literal into an string literal.
export default function toString(literal, restricted = false) {
  let string;
  if (literal.isStringLiteral() || literal.isTemplateLiteral()) {
    return literal.node;
  }

  if (literal.isIdentifier()) {
    string = literal.node.name;
  } else if (literal.isUnaryExpression({ operator: "void" })) {
    string = "undefined";
  } else if (literal.isNullLiteral()) {
    string = "null";
  } else if (literal.isNumericLiteral() || literal.isBooleanLiteral()) {
    string = String(literal.node.value);
  }

  if (restricted && (string === "undefined" || string === "null" || string === "true" || string === "false")) {
    return;
  }

  return t.stringLiteral(string);
}
