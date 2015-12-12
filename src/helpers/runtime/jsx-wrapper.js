import inject from "../inject";

// Loops over all own properties, calling
// the specified iterator function with
// value and prop name.
// Depends on the _hasOwn helper.
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
          t.blockStatement([t.returnStatement(t.callExpression(
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
