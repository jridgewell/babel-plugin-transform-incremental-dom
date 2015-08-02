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
  shouldSkip(path) {
    return path.node === path.state.node;
  },

  JSXElement(node, parent, scope, state) {
    if (state.debug) {
      debugger;
    }
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

    JSXOpeningElement: {
      exit(node, parent, scope, file) {
        let tag = toReference(t, node.name);
        let args = [tag];
        let elementFunction = node.selfClosing ? "elementVoid" : "elementOpen";
        let eager = this.parentPath.getData("needsWrapper");
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

        this.parentPath.setData("jsxAttributeDeclarators", attributeDeclarators);

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
    },

    JSXElement: {
      enter(node) {
        const inReturnStatement = this.parentPath.isReturnStatement();
        const inCallExpression = this.parentPath.isCallExpression();
        let inAttribute = false;
        let inExpressionContainer = false;
        let inAssignment = false;
        let inCollection = false;

        this.findParent((path) => {
          if (path.isJSXElement() || path.isFunction() || path.isProgram()) {
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
          }
        });

        this.setData("inAttribute", inAttribute);
        this.setData("inAssignment", inAssignment);
        this.setData("inCallExpression", inCallExpression);
        this.setData("inReturnStatement", inReturnStatement);
        this.setData("inExpressionContainer", inExpressionContainer);

        let needsWrapper = inAttribute || inCollection;


        // If we are somewhere inside a JSXExpressionContainer,
        // no need to worry about wrapping the children, since JSXElement
        // containing this container will be wrapped if needed.

        let debug;
        // if (node.openingElement.name.name === "two") {
          // debugger;
          // debug = true;
        // }

        let state = { otherJSX: needsWrapper, node: node, debug: debug };

        if (!needsWrapper) {
          // Determine if there are JSXElement in higher scopes.
          this.findParent((path) => {
            if (debug) {
               console.log(path.node.type);
               debugger;
            }
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
      },

      exit(node, parent, scope, file) {
        // Filter out empty children, and transform JSX expressions
        // into normal expressions.
        let openingElement = node.openingElement;
        let closingElement = node.closingElement;
        let eagerDeclarators = this.getData("jsxAttributeDeclarators");
        let eager = this.getData("needsWrapper");
        let children = buildChildren(t, scope, file, node.children, eager);

        let elements = [
          openingElement,
          ...children
        ];
        if (closingElement) { elements.push(closingElement); }

        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        if (t.isJSXElement(parent)) {
          return elements;
        }

        const needsWrapper = this.getData("needsWrapper");
        const inAttribute = this.getData("inAttribute");
        const inAssignment = this.getData("inAssignment");
        const inCallExpression = this.getData("inCallExpression");
        const inReturnStatement = this.getData("inReturnStatement");
        const inExpressionContainer = this.getData("inExpressionContainer");

        var debug = false;
        // if (name === 'two') debug = true;
        if (debug) console.log(`node: ${name}`, `needsWrapper: ${needsWrapper}`);
        if (inExpressionContainer && !needsWrapper) {
          if (debug) console.log("Returning undecorated elements");
          return elements;
        }

        elements = flattenExpressions(t, elements);

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        if (!(inReturnStatement || inAssignment || inCallExpression || inExpressionContainer)) {
          let args = openingElement.arguments;
          if (debug) console.log("Removing element");
          this.dangerouslyRemove();
          return;
        }

        if (needsWrapper) {
          let ref;
          if (t.isAssignmentExpression(parent)) {
            ref = parent.left;
          } else if (t.isVariableDeclarator(parent)) {
            ref = parent.id;
          }
          ref = scope.generateUidIdentifierBasedOnNode(ref);

          elements = elements.filter((element) => {
            if (t.isVariableDeclaration(element)) {
              eagerDeclarators.push(...element.declarations);
              return false;
            } else {
              return true;
            }
          });

          if (!t.isReturnStatement(elements[elements.length - 1])) {
            const element = elements.pop();
            elements.push(t.returnStatement(element.expression));
          }

          let closure = t.functionExpression(ref, [], t.blockStatement(elements));
          let jsxProp = t.memberExpression(ref, t.identifier("__jsxDOMWrapper"));

          elements = [
            closure,
            t.AssignmentExpression("=", jsxProp, t.literal(true)),
            ref
          ];

          if (eagerDeclarators.length) {
            let declaration = t.variableDeclaration("var", eagerDeclarators);
            if (inAssignment) {
              this.parentPath.parentPath.insertBefore(declaration);
            } else {
              this.parentPath.insertBefore(declaration);
            }
          }

          if (debug) console.log("Returning wrapped");
          return elements;
        } else {
          const element = elements.pop();
          elements.push(t.returnStatement(element.expression));
          this.parentPath.replaceWithMultiple(elements);
          if (debug) console.log("Returning replaced parent");
          return;
        }
      }
    }
  }});
}
