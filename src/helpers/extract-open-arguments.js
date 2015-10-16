import toReference from "./ast/to-reference";
import isLiteralOrUndefined from "./ast/is-literal-or-undefined";
import addStaticHoist from "./hoist-statics";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(t, scope, file, attributes, { eager, hoist }) {
  const attributeDeclarators = [];
  let attrs = [];
  let hasSpread = false;
  let key = null;
  let statics = [];
  let keyIndex = -1;
  let staticAssignment = null;

  attributes.forEach((attribute, i) => {
    if (t.isJSXSpreadAttribute(attribute)) {
      hasSpread = true;
      attrs.push(attribute);
      return;
    }

    const attr = toReference(t, attribute.name);
    const name = attr.value;
    let value = attribute.value;

    if (t.isJSXExpressionContainer(value)) {
      value = value.expression;

      if (eager && !isLiteralOrUndefined(t, value) && !value._iDOMwasJSX) {
        const ref = scope.generateUidIdentifierBasedOnNode(value);
        attributeDeclarators.push(t.variableDeclarator(ref, value));
        value = ref;
      }
    } else if (!value) {
      value = t.literal(true);
    }

    const literal = isLiteralOrUndefined(t, value);

    if (name === "key") {
      key = value;
      if (hoist && !(literal || eager)) {
        value = t.literal("");
        keyIndex = (i << 1) + 1;
      }

      if (hoist && eager && !literal) {
        attrs.push(attr, value);
      } else {
        statics.push(attr, value);
      }

      return;
    }

    if (literal) {
      statics.push(attr, value);
    } else {
      attrs.push(attr, value);
    }
  });

  if (!attrs.length) { attrs = null; }
  if (statics.length) {
    statics = t.arrayExpression(statics);
    if (hoist) {
      const hoist = addStaticHoist(t, scope, file, statics, key, keyIndex);
      statics = hoist.id;
      staticAssignment = hoist.staticAssignment;
    }
  } else {
    statics = null;
  }

  return { key, keyIndex, statics, attrs, attributeDeclarators, staticAssignment, hasSpread };
}

