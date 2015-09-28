import inject from "../inject";

// Caches a reference to Object#hasOwnProperty.
function hasOwnAST(t, file, ref) {
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

export default function injectHasOwn(t, file) {
  return inject(t, file, "hasOwn", hasOwnAST);
}
