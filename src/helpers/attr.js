import injectHelper from "../inject-helper";

function attrAST(t, ref) {
  const name = t.identifier("name");
  const value = t.identifier("value");

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
