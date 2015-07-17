import helpers from "./helpers";

export default function ({ Plugin, types: t }) {
  let visitor = {};
  const {
    buildChildren,
    extractOpenArguments,
    flattenExpressions,
    toReference,
    toFunctionCall,
    toFunctionCallStatement,
    attrsToAttrCalls
  } = helpers(t);

  visitor.JSXOpeningElement = {
    exit({ name, attributes, selfClosing }, parent, scope) {
      let tag = toReference(name);
      let args = [tag];
      let { key, statics, attrs, hasSpread } = extractOpenArguments(attributes);
      let elementFunction = selfClosing ? "elementVoid" : "elementOpen";

      if (key || statics || attrs) {
        args.push(key ? key : t.literal(null));
      }

      if (statics || attrs) {
        args.push(statics ? t.arrayExpression(statics) : t.literal(null));
      }

      if (hasSpread) {
        attrs = attrs.map(attrsToAttrCalls(scope));

        return t.sequenceExpression([
          toFunctionCall("elementOpenStart", args),
          ...attrs,
          toFunctionCall("elementOpenEnd", [tag])
        ]);
      } else if (attrs) {
        for (let [name, value] of attrs) {
          args.push(name, value);
        }
      }

      return toFunctionCallStatement(elementFunction, args);
    }
  };

  visitor.JSXClosingElement = {
    exit({ name }) {
      return toFunctionCallStatement("elementClose", [toReference(name)]);
    }
  };

  visitor.JSXElement = {
    exit({ openingElement, children, closingElement }) {
      children = buildChildren(children);

      let elements = [openingElement, ...children];
      if (closingElement) { elements.push(closingElement); }

      return flattenExpressions(elements)
    }
  };

  return new Plugin("incremental-dom", { visitor });
}
