import {
  buildChildren,
  extractOpenArguments,
  flattenExpressions,
  toReference,
  toFunctionCall,
  attrsToAttrCalls
} from "./helpers";

export default function ({ Plugin, types: t }) {
  let visitor = {};

  visitor.JSXOpeningElement = {
    exit({ name, attributes, selfClosing }, parent, scope) {
      let tag = toReference(t, name);
      let args = [tag];
      let { key, statics, attrs, hasSpread } = extractOpenArguments(t, attributes);
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
        attrs = attrsToAttrCalls(t, scope, attrs);

        var expressions = [
          toFunctionCall(t, "elementOpenStart", args),
          ...attrs,
          toFunctionCall(t, "elementOpenEnd", [tag])
        ];
        if (selfClosing) {
          expressions.push(toFunctionCall(t, "elementClose", [tag]));
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

      return toFunctionCall(t, elementFunction, args);
    }
  };

  visitor.JSXClosingElement = {
    exit({ name }) {
      return toFunctionCall(t, "elementClose", [toReference(t, name)]);
    }
  };

  visitor.JSXElement = {
    exit({ openingElement, children, closingElement }) {
      // Filter out empty children, and transform JSX expressions
      // into normal expressions.
      children = buildChildren(t, children);

      let elements = [openingElement, ...children];
      if (closingElement) { elements.push(closingElement); }

      if (t.isJSX(this.parent)) {
        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        return elements;
      } else {
        // Turn all sequence expressions into function statements.
        return flattenExpressions(t, elements);
      }
    }
  };

  return new Plugin("incremental-dom", { visitor });
}
