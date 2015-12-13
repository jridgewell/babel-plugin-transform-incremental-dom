import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import iDOMMethod from "./idom-method";
import extractOpenArguments from "./extract-open-arguments";
import elementCloseCall from "./element-close-call";

export default function elementOpenCall(t, path, plugin) {
  const tag = toReference(t, path.node.name);
  const selfClosing = path.node.selfClosing;

  const JSXElement = path.parentPath;
  // Only eagerly evaluate our attributes if we will be wrapping the element.
  const eager = JSXElement.getData("needsWrapper") || JSXElement.getData("containerNeedsWrapper");
  const eagerExpressions = JSXElement.getData("eagerExpressions");
  const hoist = plugin.opts.hoist;

  const {
    key,
    statics,
    attrs,
    eagerAttributes,
    hasSpread
  } = extractOpenArguments(t, path, plugin, { eager, hoist });

  // Push any eager attribute declarators onto the element's list of
  // eager declarations.
  eagerExpressions.push(...eagerAttributes);

  // Only push arguments if they're needed
  const args = [tag];
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

  const elementFunction = (selfClosing) ? "elementVoid" : "elementOpen";
  return toFunctionCall(t, iDOMMethod(elementFunction, plugin), args);
}
