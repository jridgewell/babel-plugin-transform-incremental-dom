import inject from "../inject";
import injectForOwn from "./for-own";
import injectFlipAttr from "./attr";
import toFunctionCall from "../ast/to-function-call";
import * as t from "babel-types";

// Iterates over a SpreadAttribute, assigning each property as an attribute
// on the element.
function spreadAttributeAST(plugin, ref, deps) {
  const { forOwn, attr } = deps;
  const spread = t.identifier("spread");

  /**
   * function _spreadAttribute(spread) {
   *   _forOwn(spread, _attr);
   * }
   */
  return t.functionExpression(
    ref,
    [spread],
    t.blockStatement([
      t.expressionStatement(toFunctionCall(forOwn, [spread, attr]))
    ])
  );
}

export default function injectSpreadAttribute(plugin) {
  return inject(plugin, "spreadAttribute", spreadAttributeAST, {
    forOwn: injectForOwn,
    attr: injectFlipAttr
  });
}
