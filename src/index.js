import toReference from "./helpers/ast/to-reference";
import toFunctionCall from "./helpers/ast/to-function-call";

import extractOpenArguments from "./helpers/extract-open-arguments";
import attrsToAttrCalls from "./helpers/attributes-to-attr-calls";
import buildChildren from "./helpers/build-children";
import flattenExpressions from "./helpers/flatten-expressions";
import filterEagerDeclarators from "./helpers/filter-eager-declarators";
import statementsWithReturnLast from "./helpers/statements-with-return-last";
import partitionDeclarators from "./helpers/partition-declarators";

function nullObject() {
  return Object.create(null);
}

const jsxVisitor = {
  shouldSkip(path) {
    return path.node === path.state.node;
  },

  JSXElement(node, parent, scope, state) {
    state.otherJSX = true;
    this.stop();
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

    JSXElement: {
      enter(node) {
        const inReturnStatement = this.parentPath.isReturnStatement();
        const inCallExpression = this.parentPath.isCallExpression();
        let inLoop = false;
        let inAttribute = false;
        let inExpressionContainer = false;
        let inAssignment = false;
        let inCollection = false;
        let containingJSXElement;
        let eagerDeclarators = [];

        this.findParent((path) => {
          if (path.isJSXElement()) {
            containingJSXElement = path;
            return true;
          }
          if (path.isFunction() || path.isProgram()) {
            return true;
          }
          if (path.isJSXAttribute()) {
            inAttribute = true;
          } else if (path.isJSXExpressionContainer()) {
            inExpressionContainer = true;
          } else if (path.isAssignmentExpression() || path.isVariableDeclarator()) {
            inAssignment = true;
          } else if (path.isArrayExpression() || path.isObjectExpression()) {
            inCollection = true;
          } else if (path.isLoop()) {
            inLoop = true;
          }
        });

        let needsWrapper = inAttribute || inCollection;

        this.setData("inLoop", inLoop);
        this.setData("inAttribute", inAttribute);
        this.setData("inAssignment", inAssignment);
        this.setData("inCallExpression", inCallExpression);
        this.setData("inReturnStatement", inReturnStatement);
        this.setData("containingJSXElement", containingJSXElement);
        this.setData("inExpressionContainer", inExpressionContainer);


        // If we are somewhere inside a JSXExpressionContainer,
        // no need to worry about wrapping the children, since JSXElement
        // containing this container will be wrapped if needed.

        let state = { otherJSX: needsWrapper, node: node };
        let containerNeedsWrapper = false;
        if (containingJSXElement) {
           containerNeedsWrapper = containingJSXElement.getData("containerNeedsWrapper") || containingJSXElement.getData("needsWrapper");
        }

        if (!needsWrapper && !containerNeedsWrapper) {
          // Determine if there are JSXElement in higher scopes.
          this.findParent((path) => {
            if (path.isJSXElement()) {
              state.node = path.node;
            } else if (path.isFunction()) {
              path.parentPath.traverse(jsxVisitor, state);
            } else if (path.isProgram()) {
              path.traverse(jsxVisitor, state);
            }

            return state.otherJSX;
          });
          needsWrapper = state.otherJSX;
        }

        this.setData("needsWrapper", needsWrapper);
        this.setData("containerNeedsWrapper", containerNeedsWrapper);
        if (containingJSXElement) {
          eagerDeclarators = containingJSXElement.getData("eagerDeclarators");
        }
        this.setData("eagerDeclarators", eagerDeclarators);
      },

      exit(node, parent, scope, file) {
        // Filter out empty children, and transform JSX expressions
        // into normal expressions.
        const openingElement = node.openingElement;
        const closingElement = node.closingElement;
        const eager = this.getData("needsWrapper") || this.getData("containerNeedsWrapper");
        const children = buildChildren(t, scope, file, node.children, eager);
        const containingJSXElement = this.getData("containingJSXElement");
        const needsWrapper = this.getData("needsWrapper");
        const inLoop = this.getData("inLoop");
        const inAttribute = this.getData("inAttribute");
        const inAssignment = this.getData("inAssignment");
        const inCallExpression = this.getData("inCallExpression");
        const eagerDeclarators = this.getData("eagerDeclarators");
        const inReturnStatement = this.getData("inReturnStatement");
        const inExpressionContainer = this.getData("inExpressionContainer");

        let elements = [
          openingElement,
          ...children
        ];
        if (closingElement) { elements.push(closingElement); }

        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        if (t.isJSXElement(parent)) {
          elements = filterEagerDeclarators(t, elements, eagerDeclarators);
          return elements;
        } else if (inExpressionContainer && !needsWrapper) {
          let sequence = t.sequenceExpression(elements);
          sequence._wasJSX = true;
          return sequence;
        }

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        if (!(inReturnStatement || inAssignment || inCallExpression || inExpressionContainer)) {
          this.dangerouslyRemove();
          return;
        }

        elements = flattenExpressions(t, elements);

        if (needsWrapper) {
          elements = filterEagerDeclarators(t, elements, eagerDeclarators);
        }

        if (eagerDeclarators.length && !inExpressionContainer) {
          let declaration = t.variableDeclaration("let", eagerDeclarators);
          if (inAssignment) {
            this.parentPath.parentPath.insertBefore(declaration);
          } else {
            this.parentPath.insertBefore(declaration);
          }
        }

        elements = statementsWithReturnLast(t, elements);

        if (needsWrapper) {
          let ref;
          if (t.isAssignmentExpression(parent)) {
            ref = parent.left;
          } else if (t.isVariableDeclarator(parent)) {
            ref = parent.id;
          }
          ref = scope.generateUidIdentifierBasedOnNode(ref);

          const wrapper = t.functionExpression(ref, [], t.blockStatement(elements));
          const jsxProp = t.memberExpression(ref, t.identifier("__jsxDOMWrapper"));

          let sequence = t.sequenceExpression([
            wrapper,
            t.AssignmentExpression("=", jsxProp, t.literal(true)),
            ref
          ]);

          sequence._wasJSX = true;
          return sequence;
        } else {
          this.parentPath.replaceWithMultiple(elements);
          return;
        }
      }
    },

    JSXOpeningElement: {
      exit(node, parent, scope, file) {
        let tag = toReference(t, node.name);
        let args = [tag];
        let elementFunction = node.selfClosing ? "elementVoid" : "elementOpen";
        let parentPath = this.parentPath;
        let eager = parentPath.getData("needsWrapper") || parentPath.getData("containerNeedsWrapper");
        let {
          key,
          statics,
          attrs,
          attributeDeclarators,
          hasSpread
        } = extractOpenArguments(t, scope, node.attributes, eager);

        // Only push arguments if they're needed
        if (key || statics) {
          args.push(key || t.literal(null));
        }
        if (statics) {
          args.push(t.arrayExpression(statics));
        }

        parentPath.getData("eagerDeclarators").push(...attributeDeclarators);

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
    }
  }});
}
