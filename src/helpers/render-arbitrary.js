import injectHelper from "../inject-helper";
import injectForOwn from "./for-own";

// Helper to determine if a value is a string in AST.
function isTextual(t, type, value) {
  return t.binaryExpression(
    "||",
    t.binaryExpression("===", type, t.literal('number')),
    t.binaryExpression(
      "||",
      t.binaryExpression("===", type, t.literal('string')),
      t.binaryExpression(
        "&&",
        value,
        t.binaryExpression("instanceof", value, t.identifier('String'))
      )
    )
  );
}

function isDOMWrapper(t, type, value) {
  return t.binaryExpression(
    "&&",
    t.binaryExpression("===", type, t.literal("function")),
    t.memberExpression(
      value,
      t.identifier("__jsxDOMWrapper")
    )
  );
}

function isArray(t, value) {
  return t.callExpression(
    t.memberExpression(
      t.identifier('Array'),
      t.identifier('isArray')
    ),
    [value]
  );
}


function renderArbitraryAST(t, ref, deps) {
  const forOwn = deps.forOwn;
  const child = t.identifier("child");
  const type = t.identifier("type");

  return t.functionDeclaration(
    ref,
    [child],
    t.blockStatement([
      t.variableDeclaration("var", [
        t.variableDeclarator(
          type,
          t.unaryExpression("typeof", child)
        )
      ]),
      t.IfStatement(
        isTextual(t, type, child),
        t.blockStatement([
          t.expressionStatement(t.callExpression(
            t.identifier("text"),
            [child]
          ))
        ]),
        t.ifStatement(
          isDOMWrapper(t, type, child),
          t.blockStatement([
            t.expressionStatement(t.callExpression(child, []))
          ]),
          t.ifStatement(
            isArray(t, child),
            t.blockStatement([
              t.expressionStatement(t.callExpression(
                t.memberExpression(
                  child,
                  t.identifier('forEach')
                ),
                [ref]
              ))
            ]),
            t.blockStatement([
              t.expressionStatement(t.callExpression(
                forOwn,
                [child, ref]
              ))
            ])
          )
        )
      )
    ])
  );
}

export default function injectRenderArbitrary(t, file, forcedRef) {
  return injectHelper(t, file, forcedRef, "renderArbitrary", renderArbitraryAST, {
    forOwn: injectForOwn
  });
}
