import inject from "../inject";
import * as t from "babel-types";

// Caches a reference to Object#hasOwnProperty.
function hasOwnAST() {
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

export default function injectHasOwn(plugin) {
  return inject(plugin, "hasOwn", hasOwnAST);
}
