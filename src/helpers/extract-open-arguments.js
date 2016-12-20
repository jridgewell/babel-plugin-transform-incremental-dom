import isLiteralOrSpecial, { isLiteralOrSpecialNode } from "./is-literal-or-special";
import addStaticHoist from "./hoist-statics";
import uuid from "./uuid";
import toString from "./ast/to-string";
import last from "./last";
import * as t from "babel-types";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(path, plugin) {
  const attributes = path.get("attributes");
  const { elementVarsStack } = plugin;
  const { requireStaticsKey } = plugin.opts;
  const elementVars = last(elementVarsStack);
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

    const namePath = attribute.get("name");
    let name;
    if (namePath.isJSXIdentifier()) {
      name = t.stringLiteral(namePath.node.name);
    } else {
      name = t.stringLiteral(`${namePath.node.namespace.name}:${namePath.node.name.name}`);
    }
    let value = attribute.get("value");
    let  { node } = value;

    // Attributes without a value are interpreted as `true`.
    if (!node) {
      value.replaceWith(t.jSXExpressionContainer(t.booleanLiteral(true)));
    }

    // Get the value inside the expression.
    if (value.isJSXExpressionContainer()) {
      value = value.get("expression");
      node = value.node;
    }

    let literal = isLiteralOrSpecial(value);

    if (literal) {
      node = toString(value);
    }

    // The key attribute must be passed to the `elementOpen` call.
    if (name.value === "key") {
      key = node;
      const { scope } = value;

      // If it's not a literal key, we must assign it in the statics array.
      if (!literal) {
        attrs.forEach((attr) => {
          const { name, value } = attr;
          if (isLiteralOrSpecialNode(value) || t.isIdentifier(value)) {
            return;
          }

          const id = scope.generateUidIdentifier(name ? name.value : "spread");
          scope.push({ id });
          elementVars.push(t.assignmentExpression("=", id, value));
          attr.value = id;
        });

        if (!value.isIdentifier()) {
          node = scope.maybeGenerateMemoised(node);
          key = t.assignmentExpression("=", node, key);
        }

        keyIndex = staticAttrs.length + 1;
        literal = true;
      }
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

  if (staticAttrs.length > 0 && !key) {
    if (requireStaticsKey) {
      // Don't use statics if a "key" isn't passed, as recommended by the
      // incremental dom documentation:
      // http://google.github.io/incremental-dom/#rendering-dom/statics-array.
      for (let i = 0; i < staticAttrs.length; i += 2) {
        attrs.push({
          name: staticAttrs[i],
          value: staticAttrs[i + 1],
          isSpread: false
        });
      }
      staticAttrs = [];
    } else {
      // Generate a UUID to be used as the key.
      key = t.stringLiteral(uuid());
    }
  }

  if (attrs.length === 0) { attrs = null; }
  if (staticAttrs.length === 0) {
    statics = null;
  } else {
    statics = addStaticHoist(path, plugin, statics, keyIndex);
  }

  return { key, statics, attrs };
}
