import inject from "../inject";
import * as t from "babel-types";

// Wraps a JSX element in a closure, capturing the arguments
// that it's attributes and children need to render.
// Also sets `__jsxDOMWrapper` property, so that the closure
// may be identified as a wrapper that should be called during
// render.
function jsxWrapperAST(plugin, ref) {
  const func = t.identifier("func");
  const args = t.identifier("args");

  /**
   * function _jsxWrapper(func, args) {
   *   return {
   *     __jsxDOMWrapper: true,
   *     func: func,
   *     args: args,
   *   };
   * }
   */
  return t.functionExpression(
    ref,
    [func, args],
    t.blockStatement([
      t.returnStatement(t.objectExpression([
        t.objectProperty(t.identifier("__jsxDOMWrapper"), t.booleanLiteral(true)),
        t.objectProperty(func, func),
        t.objectProperty(args, args)
      ]))
    ])
  );
}

export default function injectJSXWrapper(plugin) {
  return inject(plugin, "jsxWrapper", jsxWrapperAST);
}
