import injectAttr from "./runtime/attr";
import injectForOwn from "./runtime/for-own";
import toFunctionCall from "./ast/to-function-call";
import iDOMMethod from "./idom-method";

// Transforms an attribute array into sequential attr calls.
export default function attrsToAttrCalls(t, plugin, attrs) {
  const forOwn = injectForOwn(t, plugin);
  const forOwnAttr = injectAttr(t, plugin);
  let name = null;

  return attrs.reduce((calls, attr) => {
    if (t.isJSXSpreadAttribute(attr)) {
      calls.push(toFunctionCall(t, forOwn, [attr.argument, forOwnAttr]));
    } else if (name) {
      calls.push(toFunctionCall(t, iDOMMethod("attr", plugin), [name, attr]));
      name = null;
    } else {
      name = attr;
    }

    return calls;
  }, []);
}

