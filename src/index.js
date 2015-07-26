import helpers from "./helpers";

export default function ({ Plugin, types: t }) {
  let visitor = {};
  const {
    buildChildren,
    extractOpenArguments,
    flattenExpressions,
    toReference,
    toFunctionCall,
    attrsToAttrCalls
  } = helpers(t);

  visitor.JSXOpeningElement = {
    exit({ name, attributes, selfClosing }, parent, scope) {
      let tag = toReference(name);
      let args = [tag];
      let { key, statics, attrs, hasSpread } = extractOpenArguments(attributes);
      let elementFunction = selfClosing ? "elementVoid" : "elementOpen";

      // Only push arguments if they're needed
      if (key || statics || attrs) {
        args.push(key || t.literal(null));
      }
      if (statics || attrs) {
        args.push(statics ? t.arrayExpression(statics) : t.literal(null));
      }

      // If there is a spread element, we need to use
      // the elementOpenStart/elementOpenEnd syntax.
      // This allows spreads to be transformed into
      // attr(name, value) calls.
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

      return toFunctionCall(elementFunction, args);
    }
  };

  visitor.JSXClosingElement = {
    exit({ name }) {
      return toFunctionCall("elementClose", [toReference(name)]);
    }
  };

  visitor.JSXElement = {
    exit({ openingElement, children, closingElement }) {
      // Filter out empty children, and transform JSX expressions
      // into normal expressions.
      children = buildChildren(children);

      let elements = [openingElement, ...children];
      if (closingElement) { elements.push(closingElement); }

      // Turn all sequence expressions into function statements.
      return flattenExpressions(elements)
    }
  };

  return new Plugin("incremental-dom", { visitor });
}
