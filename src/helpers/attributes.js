import injectAttr from "./runtime/attr";
import injectForOwn from "./runtime/for-own";
import toFunctionCall from "./ast/to-function-call";
import iDOMMethod from "./idom-method";

// Detects if one of the attributes is a JSX Spread Attribute
export function hasSpread(attributes) {
  return attributes.some((attr) => attr.isJSXSpreadAttribute());
}

// Returns an array of `name`-`value` attribute pairs
export function toAttrsArray(attrs) {
  const pairsArray = [];
  attrs.forEach(({ name, value }) => {
    pairsArray.push(name)
    pairsArray.push(value);
  });

  return pairsArray;
}

// Returns an array of iDOM `attr` calls
export function toAttrsCalls(attrs, plugin) {
  const attrCall = iDOMMethod("attr", plugin);
  const forOwn = injectForOwn(plugin);
  const forOwnAttr = injectAttr(plugin);

  return attrs.map(({ name, value, isSpread }) => {
    if (isSpread) {
      return toFunctionCall(forOwn, [ value, forOwnAttr ]);
    }

    return toFunctionCall(attrCall, [ name, value ]);
  });
}
