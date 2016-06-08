import inject from "../inject";
import toFunctionCall from "../ast/to-function-call";
import * as t from "babel-types";

// Wraps a JSX element in a closure, capturing the arguments
// that it's attributes and children need to render.
function jsxClosureAST(plugin, ref) {
  const func = t.identifier("func");
  const args = t.identifier("args");
  const name = t.identifier("jsxClosure");

  /**
   * function _jsxClosure(func, args) {
   *   return function jsxClosure() {
   *     return func.apply(this, args);
   *   };
   * }
   */
  return t.functionExpression(
    ref,
    [func, args],
    t.blockStatement([
      t.returnStatement(t.functionExpression(
        name,
        [],
        t.blockStatement([t.returnStatement(toFunctionCall(
          t.memberExpression(func, t.identifier("apply")),
          [t.identifier("this"), args]
        ))])
      ))
    ])
  );
}

export default function injectJSXClosure(plugin) {
  return inject(plugin, "jsxClosure", jsxClosureAST);
}
