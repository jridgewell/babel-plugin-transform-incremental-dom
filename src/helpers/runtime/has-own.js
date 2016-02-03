import inject from "../inject";

// Caches a reference to Object#hasOwnProperty.
function hasOwnAST(t) {
  /**
   * var _hasOwn = Object.prototype.hasOwnProperty;
   */
  return t.memberExpression(
    t.memberExpression(
      t.identifier("Object"),
      t.identifier("prototype")
    ),
    t.identifier("hasOwnProperty")
  );
}

export default function injectHasOwn(t, plugin) {
  return inject(t, plugin, "hasOwn", hasOwnAST);
}
