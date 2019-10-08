import * as t from "@babel/types";

// Ensures the final statement is a return statement.
export default function statementsWithReturnLast(statements) {
  const lastIndex = statements.length - 1;
  const last = statements[lastIndex];

  if (!t.isReturnStatement(last)) {
    statements[lastIndex] = t.returnStatement(last.expression);
  }

  return statements;
}
