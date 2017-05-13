import injectSpreadAttribute from "./runtime/spread-attribute";
import injectHasOwn from "./runtime/has-own";
import toFunctionCall from "./ast/to-function-call";
import iDOMMethod from "./idom-method";
import * as t from "babel-types";

// Detects if one of the attributes is a JSX Spread Attribute
export function hasSpread(attributes) {
  return attributes.some((attr) => attr.isJSXSpreadAttribute());
}

// Detects if the skip attribute is used
export function hasSkip(attributes, { opts }) {
  const skipAttribute = opts.skipAttribute || "__skip";
  return attributes.some((attr) => attr.isJSXAttribute() && attr.node.name.name === skipAttribute);
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
export function toAttrsCalls(path, attrs, plugin) {
  const attr = iDOMMethod("attr", plugin);
  const spreadAttr = injectSpreadAttribute(plugin);
  const { scope } = path;

  const noChildren = path.get("children").every(child => {
    return child.isJSXExpressionContainer() && child.get("expression").isJSXEmptyExpression();
  });

  let spreadChildren;
  if (noChildren) {
    spreadChildren = t.identifier("undefined");
  }

  const calls = attrs.reduce((calls, { name, value, isSpread }) => {
    if (isSpread) {
      let ref = value;
      if (spreadChildren) {
        const memo = scope.maybeGenerateMemoised(value);
        if (memo) {
          value = t.assignmentExpression("=", memo, value)
          ref = memo;
        }
      }

      calls.push(toFunctionCall(spreadAttr, [value]));

      if (spreadChildren) {
        spreadChildren = t.conditionalExpression(
          toFunctionCall(injectHasOwn(plugin), [ref, t.stringLiteral("children")]),
          t.memberExpression(ref, t.identifier("children")),
          spreadChildren
        );
      }
    } else {
      calls.push(toFunctionCall(attr, [ name, value ]));
    }

    return calls;
  }, []);

  return {
    calls,
    spreadChildren,
  };
}
