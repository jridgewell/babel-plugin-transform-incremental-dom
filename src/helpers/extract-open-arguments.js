import isLiteralOrUndefined from "./ast/is-literal-or-undefined";
import addStaticHoist from "./hoist-statics";
import * as t from "babel-types";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(path, plugin) {
  const attributes = path.get("attributes");
  const { scope } = path;
  const { hoist } = plugin.opts;
  let attrs = [];
  let staticAttrs = [];
  let key = null;
  let keyIndex = -1;
  let statics = t.arrayExpression(staticAttrs);

  attributes.forEach((attribute) => {
    if (attribute.isJSXSpreadAttribute()) {
      attrs.push({
        name: null,
        value: attribute.get("argument").node,
        isSpread: true
      });
      return;
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
      if (hoist && !literal) {
        value.replaceWith(t.stringLiteral(""));
        node = value.node;
        keyIndex = staticAttrs.length + 1;
      }
      literal = true;
    }

    if (literal) {
      staticAttrs.push(name, node);
    } else {
      attrs.push({
        name,
        value: node,
        isSpread: false
      });
    }
  });

  if (attrs.length === 0) { attrs = null; }
  if (staticAttrs.length === 0) {
    statics = null;
  } else if (hoist) {
    statics = addStaticHoist(scope, plugin, statics, key, keyIndex);
  }

  return { key, statics, attrs };
}

