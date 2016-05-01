import * as t from "babel-types";

// Helper to transform an expression into an expression statement.
export default function toStatement(expression) {
  if (t.isConditionalExpression(expression)) {
    return t.toIfStatement(expression);
  }
  if (t.isFunctionExpression(expression)) {
    return t.toStatement(expression);
  }
  if (!t.isStatement(expression)) {
    return t.expressionStatement(expression);
  }
  return expression;
}
