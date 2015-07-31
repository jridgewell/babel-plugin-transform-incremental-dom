import injectHelper from "../inject-helper";

// Flip flops the arguments when calling iDOM's
// `attr`, so that this function may be used
// as an iterator like an Object#forEach.
function attrAST(t, ref) {
  const name = t.identifier("name");
  const value = t.identifier("value");

  /**
   * function _attr(value, prop) {
   *   attr(prop, value);
   * }
   */
  return t.functionDeclaration(
    ref,
    [value, name],
    t.blockStatement([
      t.expressionStatement(t.callExpression(
        t.identifier("attr"),
        [name, value]
      ))
    ])
  );
}

export default function injectAttr(t, file, forcedRef) {
  return injectHelper(t, file, forcedRef, "attr", attrAST);
}
