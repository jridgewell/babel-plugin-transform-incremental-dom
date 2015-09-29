import inject from "../inject";
import toFunctionCallStatement from "../ast/to-function-call-statement";
import iDOMMethod from "../idom-method";

// Flip flops the arguments when calling iDOM's
// `attr`, so that this function may be used
// as an iterator like an Object#forEach.
function attrAST(t, file, ref) {
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
      toFunctionCallStatement(t, iDOMMethod(file, "attr"), [name, value])
    ])
  );
}

export default function injectAttr(t, file) {
  return inject(t, file, "attr", attrAST);
}
