import toReference from "./ast/to-reference";
import isLiteralOrUndefined from "./ast/is-literal-or-undefined";
import addStaticHoist from "./hoist-statics";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(t, scope, plugin, attributes, { eager, hoist }) {
  const attributeDeclarators = [];
  let attrs = [];
  let staticAttrs = [];
  let hasSpread = false;
  let key = null;
  let keyIndex = -1;
  let statics = t.arrayExpression(staticAttrs);

  attributes.forEach((attribute, i) => {
    const node = attribute.node;
    if (attribute.isJSXSpreadAttribute()) {
      hasSpread = true;
      attrs.push(node);
      return;
    }

    const attr = toReference(t, node.name);
    const name = attr.value;
    let value = node.value;

    if (t.isJSXExpressionContainer(value)) {
      value = value.expression;

      if (eager && !isLiteralOrUndefined(t, value) && !value._iDOMwasJSX) {
        const ref = t.isIdentifier(value) ?
          value :
          scope.generateUidIdentifierBasedOnNode(value);
        attributeDeclarators.push({ ref, value });
        value = ref;
      }
    } else if (!value) {
      value = t.booleanLiteral(true);
    }

    let literal = isLiteralOrUndefined(t, value);

    if (name === "key") {
      key = value;
      if (hoist && !eager && !literal) {
        value = t.stringLiteral("");
        keyIndex = staticAttrs.length + 1;
      }
      literal = literal || !hoist || !eager;
    }

    if (literal) {
      staticAttrs.push(attr, value);
    } else {
      attrs.push(attr, value);
    }
  });

  if (!attrs.length) { attrs = null; }
  if (staticAttrs.length) {
    if (hoist) {
      statics = addStaticHoist(t, scope, plugin, statics, key, keyIndex);
    }
  } else {
    statics = null;
  }

  return { key, keyIndex, statics, attrs, attributeDeclarators, hasSpread };
}

