// Helper to transform an expression into an expression statement.
export default function toStatement(t, expression) {
  if (t.isConditionalExpression(expression)) {
    expression = t.toIfStatement(expression);
  } else if (!t.isStatement(expression)) {
    return t.expressionStatement(expression);
  }
  return expression;
}
