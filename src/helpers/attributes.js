import injectSpreadAttribute from "./runtime/spread-attribute";
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
  const attr = iDOMMethod("attr", plugin);
  const spreadAttr = injectSpreadAttribute(plugin);

  return attrs.map(({ name, value, isSpread }) => {
    if (isSpread) {
      return toFunctionCall(spreadAttr, [value]);
    }

    return toFunctionCall(attr, [ name, value ]);
  });
}
