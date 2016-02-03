import injectAttr from "./runtime/attr";
import injectForOwn from "./runtime/for-own";
import toFunctionCall from "./ast/to-function-call";
import isLiteralOrUndefined from "./ast/is-literal-or-undefined";
import addStaticHoist from "./hoist-statics";
import iDOMMethod from "./idom-method";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(t, path, plugin, { eager, hoist }) {
  const attributes = path.get("attributes");
  const { scope } = path;
  let attrs = [];
  let staticAttrs = [];
  let key = null;
  let keyIndex = -1;
  let statics = t.arrayExpression(staticAttrs);

  const hasSpread = attributes.some((a) => a.isJSXSpreadAttribute());
  let forOwn, forOwnAttr;
  if (hasSpread) {
    forOwn = injectForOwn(t, plugin);
    forOwnAttr = injectAttr(t, plugin);
  }

  attributes.forEach((attribute) => {
    if (hasSpread && attribute.isJSXSpreadAttribute()) {
      return attrs.push(toFunctionCall(t, forOwn, [
        attribute.get("argument").node,
        forOwnAttr
      ]));
    }

    const name = t.stringLiteral(attribute.node.name.name);
    let value = attribute.get("value");
    let node = value.node;

    // Attributes without a value are interpreted as `true`.
    if (!node) {
      value.replaceWith(t.jSXExpressionContainer(t.booleanLiteral(true)));
    }

    // Get the value inside the expression.
    if (value.isJSXExpressionContainer()) {
      value = value.get("expression");
      node = value.node;
    }

    let literal = isLiteralOrUndefined(value);

    // The key attribute must be passed to the `elementOpen` call.
    if (name.value === "key") {
      key = node;

      // If it's not a literal key, we must assign it in the statics array.
      // That is, unless this element is being closure wrapped, in which
      // case we must push the key attribute into the dynamic attributes.
      if (hoist && !literal && !eager) {
        node = t.stringLiteral("");
        keyIndex = staticAttrs.length + 1;
      }
      literal = literal || !(hoist && eager);
    }

    if (literal) {
      staticAttrs.push(name, node);
    } else if (hasSpread) {
      attrs.push(toFunctionCall(t, iDOMMethod("attr", plugin), [name, node]));
    } else {
      attrs.push(name, node);
    }
  });

  if (attrs.length === 0) { attrs = null; }
  if (staticAttrs.length === 0) {
    statics = null;
  } else if (hoist) {
    statics = addStaticHoist(t, scope, plugin, statics, key, keyIndex);
  }

  return { key, statics, attrs, hasSpread };
}

