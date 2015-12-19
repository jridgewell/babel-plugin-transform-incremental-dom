import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";
import extractOpenArguments from "./extract-open-arguments";

// Returns the opening element's function call.
export default function elementOpenCall(t, path, plugin, options) {
  const tag = toReference(t, path.node.name);
  const args = [tag];
  const {
    key,
    statics,
    attrs,
    hasSpread
  } = extractOpenArguments(t, path, plugin, options);

  // Only push arguments if they're needed
  if (key || statics) {
    args.push(key || t.nullLiteral());
  }
  if (statics) {
    args.push(statics);
  }

  // If there is a spread element, we need to use
  // the elementOpenStart/elementOpenEnd syntax.
  // This allows spreads to be transformed into
  // attr(name, value) calls.
  if (hasSpread) {
    const expressions = [
      toFunctionCall(t, iDOMMethod("elementOpenStart", plugin), args),
      ...attrs,
      toFunctionCall(t, iDOMMethod("elementOpenEnd", plugin), [tag])
    ];

    return t.sequenceExpression(expressions);
  }

  if (attrs) {
    // Only push key and statics if they have not
    // already been pushed.
    if (!statics) {
      if (!key) {
        args.push(t.nullLiteral());
      }
      args.push(t.nullLiteral());
    }

    args.push(...attrs);
  }

  const selfClosing = path.node.selfClosing;
  const elementFunction = (selfClosing) ? "elementVoid" : "elementOpen";
  return toFunctionCall(t, iDOMMethod(elementFunction, plugin), args);
}
