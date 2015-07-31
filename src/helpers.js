import injectAttr from "./helpers/runtime/attr";
import injectForOwn from "./helpers/runtime/for-own";
import injectRenderArbitrary from "./helpers/runtime/render-arbitrary";

import toStatement from "./helpers/ast/to-statement";
import toFunctionCall from "./helpers/ast/to-function-call";

import cleanText from "./helpers/clean-text";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export function extractOpenArguments(t, attributes) {
  let key = null;
  let statics = [];
  let attrs = [];
  let hasSpread = false;

  for (let attribute of attributes) {
    if (t.isJSXSpreadAttribute(attribute)) {
      hasSpread = true;
      attrs.push(attribute);
      continue;
    }

    const name = attribute.name.name;
    const attr = t.literal(name);
    let value = attribute.value;

    if (!value) {
      value = t.literal(true);
    } else if (t.isJSXExpressionContainer(value)) {
      value = value.expression;
    }

    if (name === "key") {
      key = value;
    }

    if (name === "key" || t.isLiteral(value)) {
      statics.push(attr, value);
    } else {
      attrs.push([ attr, value ]);
    }
  }

  if (!statics.length) { statics = null; }
  if (!attrs.length) { attrs = null; }

  return { key, statics, attrs, hasSpread };
}

// Transforms an attribute array into sequential attr calls.
export function attrsToAttrCalls(t, file, attrs) {
  return attrs.map((attr) => {
    if (t.isJSXSpreadAttribute(attr)) {
      const forOwn = injectForOwn(t, file);
      const forOwnAttr = injectAttr(t, file);
      return t.callExpression(forOwn, [attr.argument, forOwnAttr]);
    }

    return toFunctionCall(t, "attr", attr);
  });
}

// Filters out empty children, and transform JSX expressions
// into normal expressions.
export function buildChildren(t, file, children) {
  return children.reduce((children, child) => {
    const wasExpressionContainer = t.isJSXExpressionContainer(child);
    if (wasExpressionContainer) {
      child = child.expression;
    }

    if (t.isJSXEmptyExpression(child)) { return children; }

    if (t.isLiteral(child)) {
      let type = typeof child.value;
      let value = child.value;
      if (type === "string") {
        value = cleanText(value);
        if (!value) { return children; }
      }

      if (type === "string" || type === "number") {
        child = toFunctionCall(t, "text", [t.literal(value)]);
      }
    } else if (wasExpressionContainer && t.isExpression(child)) {
      let renderArbitraryRef = injectRenderArbitrary(t, file);
      child = t.callExpression(renderArbitraryRef, [child]);
    }

    children.push(child);
    return children;
  }, []);
}

// Helper to flatten out sequence expressions into a top level
// expression statements.
export function flattenExpressions(t, expressions) {
  return expressions.reduce((nodes, node) => {
    if (t.isSequenceExpression(node)) {
      let expressions = flattenExpressions(t, node.expressions);
      nodes.push(...expressions);
    } else {
      nodes.push(toStatement(t, node));
    }
    return nodes;
  }, []);
}
