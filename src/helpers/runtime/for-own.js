import inject from "../inject";
import injectHasOwn from "./has-own";
import toFunctionCall from "../ast/to-function-call";
import * as t from "babel-types";

// Loops over all own properties, calling
// the specified iterator function with
// value and prop name.
// Depends on the _hasOwn helper.
function forOwnAST(plugin, ref, deps) {
  const hasOwn = deps.hasOwn;
  const object = t.identifier("object");
  const iterator = t.identifier("iterator");
  const prop = t.identifier("prop");

  /**
   * function _forOwn(object, iterator) {
   *   for (var prop in object) {
   *     if (hasOwn.call(object, prop)) {
   *       iterator(object[prop], prop);
   *     }
   *   }
   * }
   */
  return t.functionExpression(
    ref,
    [object, iterator],
    t.blockStatement([
      t.forInStatement(
        t.variableDeclaration("var", [t.variableDeclarator(prop)]),
        object,
        t.ifStatement(
          toFunctionCall(t.memberExpression(
            hasOwn,
            t.identifier("call")
          ), [object, prop]),
          t.expressionStatement(toFunctionCall(iterator, [
            t.memberExpression(object, prop, true),
            prop
          ]))
        )
      )
    ])
  );
}

export default function injectForOwn(plugin) {
  return inject(plugin, "forOwn", forOwnAST, {
    hasOwn: injectHasOwn
  });
}
