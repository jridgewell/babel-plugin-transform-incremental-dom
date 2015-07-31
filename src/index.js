import {
  buildChildren,
  extractOpenArguments,
  flattenExpressions,
  toReference,
  toFunctionCall,
  attrsToAttrCalls
} from "./helpers";

export default function ({ Plugin, types: t }) {
  return new Plugin("incremental-dom", { visitor : {
    JSXOpeningElement: {
      exit(node, parent, scope, file) {
        let tag = toReference(t, node.name);
        let args = [tag];
        let elementFunction = node.selfClosing ? "elementVoid" : "elementOpen";
        let {
          key,
          statics,
          attrs,
          hasSpread
        } = extractOpenArguments(t, node.attributes);

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
          attrs = attrsToAttrCalls(t, file, attrs);

          var expressions = [
            toFunctionCall(t, "elementOpenStart", args),
            ...attrs,
            toFunctionCall(t, "elementOpenEnd", [tag])
          ];
          if (node.selfClosing) {
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
    },

    JSXClosingElement: {
      exit(node) {
        return toFunctionCall(t, "elementClose", [toReference(t, node.name)]);
      }
    },

    JSXElement: {
      exit(node, parent, scope, file) {
        // Filter out empty children, and transform JSX expressions
        // into normal expressions.
        let children = buildChildren(t, file, node.children);

        let elements = [node.openingElement, ...children];
        if (node.closingElement) { elements.push(node.closingElement); }

        if (t.isJSX(parent)) {
          // If we're inside a JSX node, flattening expressions
          // may force us into an unwanted function scope.
          return elements;
        }

        if (t.isReturnStatement(parent)) {
          // Turn all sequence expressions into function statements.
          elements = flattenExpressions(t, elements);
          let element = elements.pop();
          elements.push(t.returnStatement(element.expression));
          this.parentPath.replaceWithMultiple(elements);
          return;
        }

        if (this.inType('JSXExpressionContainer')) {
          return elements;
        }

        if (t.isAssignmentExpression(this.parentPath)) {
          return t.functionExpression(
            null,
            [],
            t.blockStatement(flattenExpressions(t, elements))
          );
        }

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        console.log('**************');
        console.log('removing node!');
        console.log('**************');
        this.parentPath.dangerouslyRemove();
      }
    }
  }});
}
