import inject from "../inject";
import toFunctionCall from "../ast/to-function-call";

// Wraps a JSX element in a closure, capturing the arguments
// that it's attributes and children need to render.
// Also sets `__jsxDOMWrapper` property, so that the closure
// may be identified as a wrapper that should be called during
// render.
function jsxWrapperAST(t, plugin, ref) {
  const func = t.identifier("func");
  const args = t.identifier("args");
  const wrapper = t.identifier("wrapper");

  /**
   * function _jsxWrapper(func, args) {
   *   var wrapper = args ? function() {
   *     return func.apply(this, args);
   *   } : func;
   *   wrapper.__jsxDOMWrapper = true;
   *   return wrapper;
   * }
   */
  return t.functionExpression(
    ref,
    [func, args],
    t.blockStatement([
      t.variableDeclaration("var", [t.variableDeclarator(wrapper, t.conditionalExpression(
        args,
        t.functionExpression(
          wrapper,
          [],
          t.blockStatement([t.returnStatement(toFunctionCall(
            t,
            t.memberExpression(func, t.identifier("apply")),
            [t.identifier("this"), args]
          ))])
        ),
        func
      ))]),
      t.expressionStatement(t.AssignmentExpression(
        "=",
        t.memberExpression(wrapper, t.identifier("__jsxDOMWrapper")),
        t.booleanLiteral(true))),
      t.returnStatement(wrapper)
    ])
  );
}

export default function injectJSXWrapper(t, plugin) {
  return inject(t, plugin, "jsxWrapper", jsxWrapperAST);
}
