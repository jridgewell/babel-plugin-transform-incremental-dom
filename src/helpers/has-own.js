import injectHelper from "../inject-helper";

function hasOwnAST(t, ref) {
  return t.variableDeclaration("var", [
    t.variableDeclarator(ref, t.memberExpression(
      t.identifier("Object"),
      t.identifier("hasOwnProperty")
    ))
  ]);
}

export default function injectHasOwn(t, file, forcedRef) {
  return injectHelper(t, file, forcedRef, "hasOwn", hasOwnAST);
}
