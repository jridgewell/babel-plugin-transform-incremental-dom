export default function statementsWithReturnLast(t, statements) {
  const lastIndex = statements.length - 1;
  const last = statements[lastIndex];
  if (!t.isReturnStatement(last)) {
    statements[lastIndex] = t.returnStatement(last.expression);
  }

  return statements;
}
