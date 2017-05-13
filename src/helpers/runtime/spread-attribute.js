import inject from "../inject";
import injectHasOwn from "./has-own";
import toFunctionCall from "../ast/to-function-call";
import iDOMMethod from "../idom-method";
import * as t from "babel-types";

// Iterates over a SpreadAttribute, assigning each property as an attribute
// on the element.
function spreadAttributeAST(plugin, ref, deps) {
  const { hasOwn } = deps;
  const spread = t.identifier("spread");
  const prop = t.identifier("prop");

  /**
   * function _spreadAttribute(spread) {
   *   for (var prop in spread) {
   *     if (prop !== 'children' && _hasOwn.call(spread, prop)) {
   *       attr(prop, spread[prop]);
   *     }
   *   }
   * }
   */
  return t.functionExpression(
    ref,
    [spread],
    t.blockStatement([
      t.forInStatement(
        t.variableDeclaration("var", [t.variableDeclarator(prop)]),
        spread,
        t.ifStatement(
          t.logicalExpression(
            "&&",
            t.binaryExpression("!==", prop, t.stringLiteral("children")),
            toFunctionCall(t.memberExpression(
              hasOwn,
              t.identifier("call")
            ), [spread, prop])
          ),
          t.expressionStatement(toFunctionCall(iDOMMethod("attr", plugin), [
            prop,
            t.memberExpression(spread, prop, true)
          ]))
        )
      )
    ])
  );
}

export default function injectSpreadAttribute(plugin) {
  return inject(plugin, "spreadAttribute", spreadAttributeAST, {
    hasOwn: injectHasOwn
  });
}
