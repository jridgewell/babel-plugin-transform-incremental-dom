import injectHelper from "../inject-helper";
import injectForOwn from "./for-own";

// Isolated AST code to determine if a value is textual
// (strings and numbers).
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

// Isolated AST code to determine if a value is a wrapped
// DOM manipulator function.
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

// Isolated AST code to determine if a value an Array.
function isArray(t, value) {
  return t.callExpression(
    t.memberExpression(
      t.identifier('Array'),
      t.identifier('isArray')
    ),
    [value]
  );
}

// Renders an arbitrary JSX Expression into the DOM.
// Valid types are strings, numbers, and DOM manipulators
// (which will be wrapped).
// It may also be an Array or Object, which will be iterated
// recursively.
// Depends on the _forOwn helper.
function renderArbitraryAST(t, ref, deps) {
  const forOwn = deps.forOwn;
  const child = t.identifier("child");
  const type = t.identifier("type");

  /**
   * function _renderArbitrary(child) {
   *   var type = typeof child;
   *   if (type === 'number' || (type === string || child && child instanceof String)) {
   *     text(child);
   *   } else if (type === "function" && child.__jsxDOMWrapper) {
   *     child();
   *   } else if (Array.isArray(child)) {
   *     child.forEach(_renderArbitrary);
   *   } else {
   *     _forOwn(child, _renderArbitrary);
   *   }
   * }
   */
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
