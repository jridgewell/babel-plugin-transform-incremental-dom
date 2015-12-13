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
  const eagerAttributes = [];
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
      return attrs.push(t.callExpression(forOwn, [
        attribute.get("argument").node,
        forOwnAttr
      ]));
    }

    const name = t.stringLiteral(attribute.get("name").node.name);
    let value = attribute.get("value").node;

    if (t.isJSXExpressionContainer(value)) {
      value = value.expression;

      if (eager && !isLiteralOrUndefined(t, value) && !value._iDOMwasJSX) {
        const ref = t.isIdentifier(value) ?
          value :
          scope.generateUidIdentifierBasedOnNode(value);
        eagerAttributes.push({ ref, value });
        value = ref;
      }
    } else if (!value) {
      value = t.booleanLiteral(true);
    }

    let literal = isLiteralOrUndefined(t, value);

    if (name.value === "key") {
      key = value;
      if (hoist && !eager && !literal) {
        value = t.stringLiteral("");
        keyIndex = staticAttrs.length + 1;
      }
      literal = literal || !(hoist && eager);
    }

    if (literal) {
      staticAttrs.push(name, value);
    } else if (hasSpread) {
      attrs.push(toFunctionCall(t, iDOMMethod("attr", plugin), [name, value]));
    } else {
      attrs.push(name, value);
    }
  });

  if (attrs.length === 0) { attrs = null; }
  if (staticAttrs.length === 0) {
    statics = null;
  } else if (hoist) {
    statics = addStaticHoist(t, scope, plugin, statics, key, keyIndex);
  }

  return { key, statics, attrs, eagerAttributes, hasSpread };
}

