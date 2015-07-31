import injectHelper from "../inject-helper";
import injectHasOwn from "./has-own";

function forOwnAST(t, ref, deps) {
  const hasOwn = deps.hasOwn;
  const object = t.identifier("object");
  const iterator = t.identifier("iterator");
  const prop = t.identifier("prop");

  return t.functionDeclaration(
    ref,
    [object, iterator],
    t.blockStatement([
      t.forInStatement(
        t.variableDeclaration("var", [prop]),
        object,
        t.ifStatement(
          t.callExpression(t.memberExpression(
            hasOwn,
            t.identifier("call")
          ), [object, prop]),
          t.expressionStatement(t.callExpression(iterator, [
            t.memberExpression(object, prop, true),
            prop
          ]))
        )
      )
    ])
  );
}

export default function injectForOwn(t, file, forcedRef) {
  return injectHelper(t, file, forcedRef, "forOwn", forOwnAST, {
    hasOwn: injectHasOwn
  });
}
