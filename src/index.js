import toFunctionCall from "./helpers/ast/to-function-call";
import toReference from "./helpers/ast/to-reference";

import getOption from "./helpers/get-option";
import iDOMMethod from "./helpers/idom-method";
import attrsToAttrCalls from "./helpers/attributes-to-attr-calls";
import buildChildren from "./helpers/build-children";
import extractOpenArguments from "./helpers/extract-open-arguments";
import findOtherJSX from "./helpers/find-other-jsx";
import flattenExpressions from "./helpers/flatten-expressions";
import statementsWithReturnLast from "./helpers/statements-with-return-last";

import { setupInjector } from "./helpers/inject";
import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

export default function ({ Plugin, types: t }) {
  return new Plugin("incremental-dom", { visitor : {
    Program: setupInjector,

    JSXElement: {
      enter(node) {
        let inAssignment = false;
        let inAttribute = false;
        let inCallExpression = false;
        let inCollection = false;
        let inReturnStatement = false;
        let containingJSXElement;
        let last = node;

        this.findParent((path) => {
          if (path.isJSXElement()) {
            containingJSXElement = path;
            return true;
          }
          if (path.isArrowFunctionExpression()) {
            inReturnStatement = inReturnStatement || !t.isBlockStatement(path.node.body);
            return true;
          }
          if (path.isFunction() || path.isProgram()) {
            return true;
          }
          if (path.isSequenceExpression()) {
            const expressions = path.node.expressions;
            const index = expressions.indexOf(last);
            if (index !== expressions.length - 1) {
              return true;
            }
          }
          if (path.isJSXAttribute()) {
            inAttribute = true;
          } else if (path.isAssignmentExpression() || path.isVariableDeclarator()) {
            inAssignment = true;
          } else if (path.isArrayExpression() || path.isObjectExpression()) {
            inCollection = true;
          } else if (path.isReturnStatement()) {
            inReturnStatement = true;
          } else if (path.isCallExpression()) {
            inCallExpression = true;
          }
          last = path.node;
        });

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        if (!(inReturnStatement || inAssignment || inCallExpression || containingJSXElement)) {
          throw this.errorWithNode("Unused JSX Elements aren't supported.");
        }

        const containerNeedsWrapper = (containingJSXElement) ?
          containingJSXElement.getData("containerNeedsWrapper") || containingJSXElement.getData("needsWrapper") :
          false;
        let needsWrapper = inAttribute || inAssignment || inCollection || inCallExpression;
        if (!containingJSXElement && !needsWrapper) {
          // Determine if there are JSXElements in a higher scope.
          needsWrapper = findOtherJSX(this);
        }

        // Tie a child JSXElement's eager declarations with the parent's, so
        // so all declarations come before the element.
        const eagerDeclarators = (containingJSXElement) ?
          containingJSXElement.getData("eagerDeclarators") :
          [];
        const staticAttrs = (containingJSXElement) ?
          containingJSXElement.getData("staticAttrs") :
          [];

        this.setData("containerNeedsWrapper", containerNeedsWrapper);
        this.setData("containingJSXElement", containingJSXElement);
        this.setData("eagerDeclarators", eagerDeclarators);
        this.setData("needsWrapper", needsWrapper);
        this.setData("staticAttrs", staticAttrs);
      },

      exit(node, parent, scope, file) {
        const {
          containerNeedsWrapper,
          containingJSXElement,
          eagerDeclarators,
          staticAttrs,
          needsWrapper,
          key
        } = this.data;

        const eager = needsWrapper || containerNeedsWrapper;
        const hoist = getOption(file, "hoist");

        const explicitReturn = t.isReturnStatement(parent);
        const implicitReturn = t.isArrowFunctionExpression(parent);

        // Filter out empty children, and transform JSX expressions
        // into normal expressions.
        const openingElement = node.openingElement;
        const closingElement = node.closingElement;
        const children = buildChildren(t, scope, file, node.children, eagerDeclarators, { eager });

        let elements = [ openingElement, ...children ];
        if (closingElement) { elements.push(closingElement); }

        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        if (t.isJSXElement(parent)) {
          return elements;
        }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (containingJSXElement && !needsWrapper) {
          const sequence = t.sequenceExpression(elements);
          // Mark this sequence as a JSX Element so we can avoid an unnecessary
          // renderArbitrary call.
          sequence._iDOMwasJSX = true;
          return sequence;
        }

        // Transform (recursively) any sequence expressions into a series of
        // statements.
        elements = flattenExpressions(t, elements);

        // Ensure the last statement returns the DOM element.
        if (explicitReturn || implicitReturn || needsWrapper) {
          elements = statementsWithReturnLast(t, elements);
        }

        if (!containingJSXElement) {
          if (eagerDeclarators.length) {
            // Find the closest statement, and insert our eager declarations
            // before it.
            const parentStatement = this.getStatementParent();
            const [path] = parentStatement.insertBefore(t.variableDeclaration(
              "let",
              eagerDeclarators
            ));
            // Add our eager declarations to the scopes tracked bindings.
            scope.registerBinding("let", path);
          }
        }

        if (hoist && staticAttrs.length) {
          staticAttrs.forEach((attrs) => {
            const declaration = t.variableDeclaration("let", [attrs.declarator]);
            const key = attrs.key;
            const identifierKey = t.isIdentifier(key.value);
            const binding = identifierKey && scope.getBinding(key.value.name);

            if (identifierKey) {
              let hoisted;
              if (eager) {
                hoisted = declaration;
              } else {
                hoisted = t.expressionStatement(t.assignmentExpression(
                  "=",
                  t.memberExpression(
                    attrs.declarator.id,
                    t.literal(key.index),
                    true
                  ),
                  key.value
                ));
              }

              const parent = (binding) ? binding.path.parentPath : this.parentPath;
              if (parent.isArrowFunctionExpression()) {
                const body = parent.get("body");
                if (this.parentPath === parent) {
                  elements.unshift(hoisted);
                } else if (body.isBlockStatement()) {
                  body.unshiftContainer("body", hoisted);
                } else {
                  parent.replaceWith(t.arrowFunctionExpression(
                    parent.node.params,
                    t.blockStatement([
                      hoisted,
                      t.returnStatement(body.node)
                    ]),
                    parent.node.async
                  ));
                }
              } else if (parent.isFunction()) {
                parent.get("body").unshiftContainer("body", hoisted);
              } else if (binding) {
                const statement = binding.path.getStatementParent();
                statement.insertAfter(hoisted);
              } else {
                elements.unshift(hoisted);
              }
            }

            if (!(binding && eager)) {
              const programScope = scope.getProgramParent();
              programScope.path.unshiftContainer("body", declaration);
            }
          });
        }

        if (needsWrapper) {
          // Create a wrapper around our element, and mark it as a one so later
          // child expressions can identify and "render" it.
          const jsxWrapperRef = injectJSXWrapper(t, file);
          const wrapper = toFunctionCall(t, jsxWrapperRef, [
            t.functionExpression(null, [], t.blockStatement(elements))
          ]);
          wrapper._iDOMwasJSX = true;
          return wrapper;
        }

        // This is the main JSX element. Replace the return statement
        // with all the nested calls, returning the main JSX element.
        if (implicitReturn) {
          this.parentPath.replaceWith(t.arrowFunctionExpression(
            parent.params,
            t.blockStatement(elements),
            parent.async
          ));
        } else if (explicitReturn) {
          this.parentPath.replaceWithMultiple(elements);
        } else {
          return elements;
        }
      }
    },

    JSXOpeningElement: {
      exit(node, parent, scope, file) {
        const tag = toReference(t, node.name);

        const JSXElement = this.parentPath;
        // Only eagerly evaluate our attributes if we will be wrapping the element.
        const eager = JSXElement.getData("needsWrapper") || JSXElement.getData("containerNeedsWrapper");
        const eagerDeclarators = JSXElement.getData("eagerDeclarators");
        const hoist = getOption(file, "hoist");
        const staticAttrs = JSXElement.getData("staticAttrs");

        const {
          key,
          statics,
          attrs,
          attributeDeclarators,
          staticAttr,
          hasSpread
        } = extractOpenArguments(t, scope, node.attributes, { eager, hoist });

        // Push any eager attribute declarators onto the element's list of
        // eager declarations.
        eagerDeclarators.push(...attributeDeclarators);
        if (staticAttr) {
          staticAttrs.push(staticAttr);
        }

        // Only push arguments if they're needed
        const args = [tag];
        if (key || statics) {
          args.push(key || t.literal(null));
        }
        if (statics) {
          args.push(statics);
        }

        // If there is a spread element, we need to use
        // the elementOpenStart/elementOpenEnd syntax.
        // This allows spreads to be transformed into
        // attr(name, value) calls.
        if (hasSpread) {
          const attrCalls = attrsToAttrCalls(t, file, attrs);

          const expressions = [
            toFunctionCall(t, iDOMMethod(file, "elementOpenStart"), args),
            ...attrCalls,
            toFunctionCall(t, iDOMMethod(file, "elementOpenEnd"), [tag])
          ];
          if (node.selfClosing) {
            expressions.push(toFunctionCall(t, iDOMMethod(file, "elementClose"), [tag]));
          }

          return t.sequenceExpression(expressions);
        }

        if (attrs) {
          // Only push key and statics if they have not
          // already been pushed.
          if (!statics) {
            if (!key) {
              args.push(t.literal(null));
            }
            args.push(t.literal(null));
          }

          args.push(...attrs);
        }

        const elementFunction = (node.selfClosing) ? "elementVoid" : "elementOpen";
        return toFunctionCall(t, iDOMMethod(file, elementFunction), args);
      }
    },

    JSXClosingElement: {
      exit(node, parent, scope, file) {
        return toFunctionCall(t, iDOMMethod(file, "elementClose"), [toReference(t, node.name)]);
      }
    },

    JSXNamespacedName: function() {
      throw this.errorWithNode("JSX Namespaces aren't supported.");
    }
  }});
}
