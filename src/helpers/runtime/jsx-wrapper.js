import inject from "../inject";

// Loops over all own properties, calling
// the specified iterator function with
// value and prop name.
// Depends on the _hasOwn helper.
function jsxWrapperAST(t, plugin, ref) {
  const func = t.identifier("func");
  const jsxProp = t.memberExpression(
    func,
    t.identifier("__jsxDOMWrapper")
  );

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
      t.expressionStatement(t.AssignmentExpression("=", jsxProp, t.booleanLiteral(true))),
      t.returnStatement(func)
    ])
  );
}

export default function injectJSXWrapper(t, plugin) {
  return inject(t, plugin, "jsxWrapper", jsxWrapperAST);
}
