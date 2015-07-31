import injectAttr from "./runtime/attr";
import injectForOwn from "./runtime/for-own";
import toFunctionCall from "./ast/to-function-call";

// Transforms an attribute array into sequential attr calls.
export default function attrsToAttrCalls(t, file, attrs) {
  return attrs.map((attr) => {
    if (t.isJSXSpreadAttribute(attr)) {
      const forOwn = injectForOwn(t, file);
      const forOwnAttr = injectAttr(t, file);
      return toFunctionCall(t, forOwn, [attr.argument, forOwnAttr]);
    }

    return toFunctionCall(t, "attr", attr);
  });
}

