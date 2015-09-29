import inject from "../inject";
import injectForOwn from "./for-own";
import toFunctionCallStatement from "../ast/to-function-call-statement";
import iDOMMethod from "../idom-method";

// Isolated AST code to determine if a value is textual
// (strings and numbers).
function isTextual(t, type, value) {
  return t.binaryExpression(
    "||",
    t.binaryExpression("===", type, t.literal("number")),
    t.binaryExpression(
      "||",
      t.binaryExpression("===", type, t.literal("string")),
      t.binaryExpression(
        "&&",
        value,
        t.binaryExpression("instanceof", value, t.identifier("String"))
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
      t.identifier("Array"),
      t.identifier("isArray")
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
function renderArbitraryAST(t, file, ref, deps) {
  const forOwn = deps.forOwn;
  const child = t.identifier("child");
  const type = t.identifier("type");
  const forEach = t.memberExpression(
    child,
    t.identifier("forEach")
  );

  /**
   * function _renderArbitrary(child) {
   *   var type = typeof child;
   *   if (type === "number" || (type === string || child && child instanceof String)) {
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
          toFunctionCallStatement(t, iDOMMethod(file, "text"), [child])
        ]),
        t.ifStatement(
          isDOMWrapper(t, type, child),
          t.blockStatement([
            toFunctionCallStatement(t, child, [])
          ]),
          t.ifStatement(
            isArray(t, child),
            t.blockStatement([
              toFunctionCallStatement(t, forEach, [ref])
            ]),
            t.blockStatement([
              toFunctionCallStatement(t, forOwn, [child, ref])
            ])
          )
        )
      )
    ])
  );
}

export default function injectRenderArbitrary(t, file) {
  return inject(t, file, "renderArbitrary", renderArbitraryAST, {
    forOwn: injectForOwn
  });
}
