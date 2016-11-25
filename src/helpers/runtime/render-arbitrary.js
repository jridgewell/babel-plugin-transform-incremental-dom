import inject from "../inject";
import injectForOwn from "./for-own";
import toFunctionCall from "../ast/to-function-call";
import iDOMMethod from "../idom-method";
import * as t from "babel-types";

// Isolated AST code to determine if a value is textual
// (strings and numbers).
function isTextual(type, value) {
  return t.logicalExpression(
    "||",
    t.binaryExpression("===", type, t.stringLiteral("number")),
    t.logicalExpression(
      "||",
      t.binaryExpression("===", type, t.stringLiteral("string")),
      t.logicalExpression(
        "&&",
        t.binaryExpression("===", type, t.stringLiteral("object")),
        t.binaryExpression("instanceof", value, t.identifier("String"))
      )
    )
  );
}

// Isolated AST code to determine if a value is a wrapped
// DOM closure.
function isDOMWrapper(type, value) {
  return t.logicalExpression(
    "&&",
    t.binaryExpression("===", type, t.stringLiteral("function")),
    t.memberExpression(
      value,
      t.identifier("__jsxDOMWrapper")
    )
  );
}

// Isolated AST code to determine if a value an Array.
function isArray(value) {
  return toFunctionCall(
    t.memberExpression(
      t.identifier("Array"),
      t.identifier("isArray")
    ),
    [value]
  );
}

// Isolated AST code to determine if a value an Object.
function isObject(type, value) {
  return t.logicalExpression(
    "&&",
    t.binaryExpression("===", type, t.stringLiteral("object")),
    t.binaryExpression(
      "===",
      toFunctionCall(t.identifier("String"), [value]),
      t.stringLiteral("[object Object]")
    )
  );
}

// Renders an arbitrary JSX Expression into the DOM.
// Valid types are strings, numbers, and DOM closures.
// It may also be an Array or Object, which will be iterated
// recursively to find a valid type.
// Depends on the _forOwn helper.
function renderArbitraryAST(plugin, ref, deps) {
  const { forOwn } = deps;
  const child = t.identifier("child");
  const type = t.identifier("type");
  const forEach = t.memberExpression(
    child,
    t.identifier("forEach")
  );

  /**
   * function _renderArbitrary(child) {
   *   var type = typeof child;
   *   if (type === "number" || (type === string || type === 'object' && child instanceof String)) {
   *     text(child);
   *   } else if (type === "function" && child.__jsxDOMWrapper) {
   *     child();
   *   } else if (Array.isArray(child)) {
   *     child.forEach(_renderArbitrary);
   *   } else if (type === 'object' && String(child) === '[object Object]') {
   *     _forOwn(child, _renderArbitrary);
   *   }
   * }
   */
  return t.functionExpression(
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
        isTextual(type, child),
        t.blockStatement([
          t.expressionStatement(toFunctionCall(iDOMMethod("text", plugin), [child]))
        ]),
        t.ifStatement(
          isDOMWrapper(type, child),
          t.blockStatement([
            t.expressionStatement(toFunctionCall(child, []))
          ]),
          t.ifStatement(
            isArray(child),
            t.blockStatement([
              t.expressionStatement(toFunctionCall(forEach, [ref]))
            ]),
            t.ifStatement(
              isObject(type, child),
              t.blockStatement([
                t.expressionStatement(toFunctionCall(forOwn, [child, ref]))
              ])
            )
          )
        )
      )
    ])
  );
}

export default function injectRenderArbitrary(plugin) {
  return inject(plugin, "renderArbitrary", renderArbitraryAST, {
    forOwn: injectForOwn
  });
}
