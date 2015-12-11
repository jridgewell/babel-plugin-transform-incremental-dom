import toFunctionCall from "./ast/to-function-call";
import toReference from "./ast/to-reference";

import getOption from "./get-option";
import iDOMMethod from "./idom-method";
import attrsToAttrCalls from "./attributes-to-attr-calls";
import extractOpenArguments from "./extract-open-arguments";
import elementCloseCall from "./element-close-call";

export default function elementOpenCall(t, path, file) {
  const tag = toReference(t, path.node.name);
  const selfClosing = path.node.selfClosing;

  const JSXElement = path.parentPath;
  // Only eagerly evaluate our attributes if we will be wrapping the element.
  const eager = JSXElement.getData("needsWrapper") || JSXElement.getData("containerNeedsWrapper");
  const eagerDeclarators = JSXElement.getData("eagerDeclarators");
  const hoist = getOption(file, "hoist");
  const staticAssignments = JSXElement.getData("staticAssignments");

  const {
    key,
    statics,
    attrs,
    attributeDeclarators,
    staticAssignment,
    hasSpread
  } = extractOpenArguments(t, path.scope, file, path.get("attributes"), { eager, hoist });

  // Push any eager attribute declarators onto the element's list of
  // eager declarations.
  eagerDeclarators.push(...attributeDeclarators);
  if (staticAssignment) {
    staticAssignments.push(staticAssignment);
  }

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
    const attrCalls = attrsToAttrCalls(t, file, attrs);

    const expressions = [
      toFunctionCall(t, iDOMMethod(file, "elementOpenStart"), args),
      ...attrCalls,
      toFunctionCall(t, iDOMMethod(file, "elementOpenEnd"), [tag])
    ];
    if (selfClosing) {
      expressions.push(elementCloseCall(t, path, file));
    }

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
  return toFunctionCall(t, iDOMMethod(file, elementFunction), args);
}
