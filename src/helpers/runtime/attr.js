import inject from "../inject";
import toFunctionCall from "../ast/to-function-call";
import iDOMMethod from "../idom-method";
import * as t from "babel-types";

// Flip flops the arguments when calling iDOM's
// `attr`, so that this function may be used
// as an iterator like an Object#forEach.
function flipAttrAST(plugin, ref) {
  const name = t.identifier("name");
  const value = t.identifier("value");

  /**
   * function _flipAttr(value, prop) {
   *   attr(prop, value);
   * }
   */
  return t.functionExpression(
    ref,
    [value, name],
    t.blockStatement([
      t.expressionStatement(toFunctionCall(iDOMMethod("attr", plugin), [name, value]))
    ])
  );
}

export default function injectFlipAttr(plugin) {
  return inject(plugin, "flipAttr", flipAttrAST);
}
