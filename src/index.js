import toReference from "./helpers/ast/to-reference";
import toFunctionCall from "./helpers/ast/to-function-call";

import extractOpenArguments from "./helpers/extract-open-arguments";
import attrsToAttrCalls from "./helpers/attributes-to-attr-calls";
import buildChildren from "./helpers/build-children";
import flattenExpressions from "./helpers/flatten-expressions";

function nullObject() {
  return Object.create(null);
}

export default function ({ Plugin, types: t }) {
  return new Plugin("incremental-dom", { visitor : {
    Program: function(program, parent, scope, file) {
      // A map to store helper variable references
      // for each file
      file.setDynamic("incremental-dom-helpers", nullObject);

      // A map of semaphores for each helper, so that
      // a dependency is not injected multiple times.
      // We use this instead of only helperReferences,
      // so that we may create dependency references
      // and later unshift the actual definition,
      // placing dependency definitions before the
      // dependent.
      file.setDynamic("incremental-dom-helpers-defs", nullObject);
    },

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

          let highestJSX = true;
          const visitor = {
            JSXElement() {
              highestJSX = false;
              this.stop();
            }
          };

          if (!this.inType("JSXExpressionContainer")) {
            let path = this;
            do {
              path = path.getFunctionParent();
              if (path.isFunction()) {
                path.parentPath.traverse(visitor);
              } else {
                path = null;
              }
            } while (path && highestJSX);
          }

          if (highestJSX) {
            elements = flattenExpressions(t, elements);
            let element = elements.pop();
            elements.push(t.returnStatement(element.expression));
            this.parentPath.replaceWithMultiple(elements);
            return;
          }
        }

        if (this.inType("JSXExpressionContainer")) {
          return elements;
        }

        if (this.inType("AssignmentExpression", "VariableDeclarator")) {
          let ref, id;
          if (t.isAssignmentExpression(parent)) {
            ref = parent.left;
          } else if (t.isVariableDeclarator(parent)) {
            ref = parent.id;
          } else {
            id = ref = scope.generateUidIdentifier("jsxWrapper");
          }
          let closure = t.functionExpression(
            id,
            [],
            t.blockStatement(flattenExpressions(t, elements))
          );
          return t.sequenceExpression([
            closure,
            t.AssignmentExpression(
              "=",
              t.memberExpression(
                ref,
                t.identifier("__jsxDOMWrapper")
              ),
              t.literal(true)
            ),
            ref
          ]);
        }

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        this.parentPath.dangerouslyRemove();
      }
    }
  }});
}
