import inject from "../inject";
import * as t from "babel-types";

// Marks the function so that it may be identified later a lazy evaluation JSX
// element. This is how we implement JSX's pure semantics into iDOM's impure
// diffing.
function jsxWrapperAST(plugin, ref) {
  const func = t.identifier("func");

  /**
   * function _jsxWrapper(func) {
   *   func.__jsxDOMWrapper = true;
   *   return func;
   * }
   */
  return t.functionExpression(
    ref,
    [func],
    t.blockStatement([
      t.expressionStatement(t.assignmentExpression(
        "=",
        t.memberExpression(func, t.identifier("__jsxDOMWrapper")),
        t.booleanLiteral(true)
      )),
      t.returnStatement(func)
    ])
  );
}

export default function injectJSXWrapper(plugin) {
  return inject(plugin, "jsxWrapper", jsxWrapperAST);
}
