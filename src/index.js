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
      if (key || statics) {
        args.push(key || t.literal(null));
      }
      if (statics) {
        args.push(t.arrayExpression(statics));
      }

      // If there is a spread element, we need to use
      // the elementOpenStart/elementOpenEnd syntax.
      // This allows spreads to be transformed into
      // attr(name, value) calls.
      if (hasSpread) {
        attrs = attrs.map(attrsToAttrCalls(scope));

        var expressions = [
          toFunctionCall("elementOpenStart", args),
          ...attrs,
          toFunctionCall("elementOpenEnd", [tag])
        ];
        if (selfClosing) {
          expressions.push(toFunctionCall("elementClose", [tag]));
        }

        return t.sequenceExpression(expressions);
      } else if (attrs) {

        // Only push key and statics if they have not
        // already been pushed.
        if (!statics) {
          if (!key) {
            args.push(t.literal(null));
          }
          args.push(t.literal(null));
        }

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
