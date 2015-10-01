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
  let staticAttr = null;

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
      statics.push(attr);
      if (hoist && !(eager || t.isLiteral(value))) {
        statics.push(t.identifier("undefined"));
        keyIndex = (i << 1) + 1;
      } else {
        statics.push(value);
      }

      key = value;
      return;
    }

    if (t.isLiteral(value)) {
      statics.push(attr, value);
    } else {
      attrs.push(attr, value);
    }
  });

  if (!attrs.length) { attrs = null; }
  if (statics.length) {
    statics = t.arrayExpression(statics);
    if (hoist) {
      const ref = scope.generateUidIdentifier("statics");
      staticAttr = {
        declarator: t.variableDeclarator(ref, statics),
        key: {
          index: keyIndex,
          value: key
        }
      };
      statics = ref;
    }
  } else {
    statics = null;
  }

  return { key, keyIndex, statics, attrs, attributeDeclarators, staticAttr, hasSpread };
}

