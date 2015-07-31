import toReference from "./ast/to-reference";

// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export default function extractOpenArguments(t, attributes) {
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

    const attr = toReference(t, attribute.name);
    const name = attr.value;
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

