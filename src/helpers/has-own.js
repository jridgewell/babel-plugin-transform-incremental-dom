import injectHelper from "../inject-helper";

// Caches a reference to Object#hasOwnProperty.
function hasOwnAST(t, ref) {
  /**
   * var _hasOwn = Object.hasOwnProperty;
   */
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
