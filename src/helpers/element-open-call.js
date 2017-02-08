import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";
import iDOMMethod from "./idom-method";
import isComponent from "./is-component";
import extractOpenArguments from "./extract-open-arguments";
import { hasSpread, hasSkip, toAttrsArray, toAttrsCalls } from "./attributes";
import * as t from "babel-types";

// Returns the opening element's function call.
export default function elementOpenCall(path, plugin) {
  const name = path.get("name");
  const attributes = path.get("attributes");
  const useReference = isComponent(name, plugin);
  const tag = toReference(name.node, useReference);
  const args = [tag];
  const {
    key,
    statics,
    attrs
  } = extractOpenArguments(path, plugin);

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
  if (hasSpread(attributes)) {
    const expressions = [
      toFunctionCall(iDOMMethod("elementOpenStart", plugin), args),
      ...toAttrsCalls(attrs, plugin),
      toFunctionCall(iDOMMethod("elementOpenEnd", plugin), [tag])
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

    args.push(...toAttrsArray(attrs));
  }

  const { selfClosing } = path.node;
  const elementFunction = (selfClosing && !hasSkip(attributes, plugin)) ?
    "elementVoid" :
    "elementOpen";
  return toFunctionCall(iDOMMethod(elementFunction, plugin), args);
}
