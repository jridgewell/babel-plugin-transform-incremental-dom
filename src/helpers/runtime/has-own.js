import inject from "../inject";

// Caches a reference to Object#hasOwnProperty.
function hasOwnAST(t, ref) {
  /**
   * var _hasOwn = Object.prototype.hasOwnProperty;
   */
  return t.variableDeclaration("var", [
    t.variableDeclarator(ref, t.memberExpression(
      t.memberExpression(
        t.identifier("Object"),
        t.identifier("prototype")
      ),
      t.identifier("hasOwnProperty")
    ))
  ]);
}

export default function injectHasOwn(t, file, forcedRef = null) {
  return inject(t, file, forcedRef, "hasOwn", hasOwnAST);
}
