// Places all our eager declarators **before** the current path's statement,
// so that the path or sub-paths may be transformed into a lazily evaluated
// function.
export default function eagerlyDeclare(t, scope, path, eagerDeclarators) {
  // Find the closest statement, and insert our eager declarations
  // before it.
  const parentStatement = path.getStatementParent();
  const declarationPath = parentStatement.insertBefore(t.variableDeclaration(
    "let",
    eagerDeclarators
  ));

  // Add our eager declarations to the scope's tracked bindings.
  scope.registerBinding("let", declarationPath[0]);
}
