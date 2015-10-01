import injectAttr from "./runtime/attr";
import injectForOwn from "./runtime/for-own";
import toFunctionCall from "./ast/to-function-call";
import iDOMMethod from "./idom-method";

// Transforms an attribute array into sequential attr calls.
export default function attrsToAttrCalls(t, file, attrs) {
  const forOwn = injectForOwn(t, file);
  const forOwnAttr = injectAttr(t, file);
  let name = null;

  return attrs.reduce((calls, attr) => {
    if (t.isJSXSpreadAttribute(attr)) {
      calls.push(toFunctionCall(t, forOwn, [attr.argument, forOwnAttr]));
    } else {
      if (name) {
        calls.push(toFunctionCall(t, iDOMMethod(file, "attr"), [name, attr]));
        name = null;
      } else {
        name = attr;
      }
    }

    return calls;
  }, []);
}

