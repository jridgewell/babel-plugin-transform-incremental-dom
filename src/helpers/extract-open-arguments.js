import toReference from "./ast/to-reference";
import getOption from "./get-option";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(t, scope, attributes, { eager, hoist }) {
  const attributeDeclarators = [];
  let attrs = [];
  let hasSpread = false;
  let key = null;
  let statics = [];
  let keyIndex = -1;

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

      if (eager && !t.isLiteral(value) && !value._iDOMwasJSX) {
        const ref = scope.generateUidIdentifierBasedOnNode(value);
        attributeDeclarators.push(t.variableDeclarator(ref, value));
        value = ref;
      }
    } else if (!value) {
      value = t.literal(true);
    }

    if (name === "key") {
      statics.push(t.literal("key"));
      if (hoist) {
        if (key) { statics[keyIndex] = key; }
        statics.push(t.identifier("undefined"));
      } else {
        statics.push(value);
      }
      key = value;
      keyIndex = ((i + 1) << 1) - 1;
      return;
    }

    if (t.isLiteral(value)) {
      statics.push(attr, value);
    } else {
      attrs.push(attr, value);
    }
  });

  if (!statics.length) { statics = null; }
  if (!attrs.length) { attrs = null; }

  return { key, keyIndex, statics, attrs, attributeDeclarators, hasSpread };
}

