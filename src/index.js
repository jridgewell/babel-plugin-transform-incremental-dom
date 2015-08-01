import toReference from "./helpers/ast/to-reference";
import toFunctionCall from "./helpers/ast/to-function-call";

import extractOpenArguments from "./helpers/extract-open-arguments";
import attrsToAttrCalls from "./helpers/attributes-to-attr-calls";
import buildChildren from "./helpers/build-children";
import flattenExpressions from "./helpers/flatten-expressions";

function nullObject() {
  return Object.create(null);
}

const jsxVisitor = {
  JSXElement(node, parent, scope, state) {
    if (node !== state.current) {
      state.highestJSX = false;
      this.stop();
    }
  }
};

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
          attributeDeclarators,
          hasSpread
        } = extractOpenArguments(t, scope, node.attributes);

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

          let expressions = [
            toFunctionCall(t, "elementOpenStart", args),
            ...attrs,
            toFunctionCall(t, "elementOpenEnd", [tag])
          ];
          if (node.selfClosing) {
            expressions.push(toFunctionCall(t, "elementClose", [tag]));
          }

          const open = t.sequenceExpression(expressions);
          open._jsxAttributeDeclarators = attributeDeclarators;
          return open;
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

        const open = toFunctionCall(t, elementFunction, args);
        open._jsxAttributeDeclarators = attributeDeclarators;
        return open;
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
        let openingElement = node.openingElement;
        let closingElement = node.closingElement;
        let attributeDeclarators = openingElement._jsxAttributeDeclarators;
        let {
          children,
          childrenDeclarations
        } = buildChildren(t, scope, file, node.children);

        let elements = [
          ...attributeDeclarators,
          openingElement,
          ...childrenDeclarations,
          ...children
        ];
        if (closingElement) { elements.push(closingElement); }

        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        if (t.isJSX(parent)) {
          return elements;
        }

        const inJSXExpressionContainer = this.inType("JSXExpressionContainer");
        const inReturnStatement = t.isReturnStatement(parent);

        if (inJSXExpressionContainer && !inReturnStatement) {
          return elements;
        }

        elements = flattenExpressions(t, elements);

        // Determine if there are JSXElement in higher scopes.
        let state = { highestJSX: true, current: node };

        // If we are somewhere inside a JSXExpressionContainer,
        // no need to worry about wrapping the children, since JSXElement
        // containing this container will be wrapped if needed.
        if (!inJSXExpressionContainer) {
          let path = this;
          while (state.highestJSX && (path = path.getFunctionParent())) {
            if (path.isFunction()) {
              path.parentPath.traverse(jsxVisitor, state);
            } else {
              path.traverse(jsxVisitor, state);
            }
          }
        }

        // If we are in the highest scoped JSXElement, we can
        // safely assume that DOM manipulations are intentional.
        if (state.highestJSX) {
          const element = elements.pop();
          elements.push(t.returnStatement(element.expression));
          this.parentPath.replaceWithMultiple(elements);
          return;
        }

        let assigned = false;
        this.findParent(function(path) {
          if (path.isAssignmentExpression() || path.isVariableDeclarator()) {
            assigned = true;
            return true;
          } else if (path.isFunction() || path.isProgram()) {
            return true;
          }
        });

        if (inReturnStatement || assigned) {
          let ref;
          if (t.isAssignmentExpression(parent)) {
            ref = parent.left;
          } else if (t.isVariableDeclarator(parent)) {
            ref = parent.id;
          }
          ref = scope.generateUidIdentifierBasedOnNode(ref);
          let closure = t.functionExpression(ref, [], t.blockStatement(elements));
          let jsxProp = t.memberExpression(ref, t.identifier("__jsxDOMWrapper"));

          return t.sequenceExpression([
            closure,
            t.AssignmentExpression("=", jsxProp, t.literal(true)),
            ref
          ]);
        }

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        this.dangerouslyRemove();
      }
    }
  }});
}
