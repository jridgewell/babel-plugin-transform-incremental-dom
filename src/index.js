import toFunctionCall from "./helpers/ast/to-function-call";
import toReference from "./helpers/ast/to-reference";

import attrsToAttrCalls from "./helpers/attributes-to-attr-calls";
import buildChildren from "./helpers/build-children";
import extractOpenArguments from "./helpers/extract-open-arguments";
import filterEagerDeclarators from "./helpers/filter-eager-declarators";
import findOtherJSX from "./helpers/find-other-jsx";
import flattenExpressions from "./helpers/flatten-expressions";
import partitionDeclarators from "./helpers/partition-declarators";
import statementsWithReturnLast from "./helpers/statements-with-return-last";

import { setupInjector } from "./helpers/inject";
import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

export default function ({ Plugin, types: t }) {
  return new Plugin("incremental-dom", { visitor : {
    Program: setupInjector,

    JSXElement: {
      enter(node, parent) {
        const inReturnStatement = t.isReturnStatement(parent);
        const inCallExpression = t.isCallExpression(parent);
        let inAssignment = false;
        let inAttribute = false;
        let inCollection = false;
        let containingJSXElement;

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
          } else if (path.isAssignmentExpression() || path.isVariableDeclarator()) {
            inAssignment = true;
          } else if (path.isArrayExpression() || path.isObjectExpression()) {
            inCollection = true;
          }
        });

        this.setData("containingJSXElement", containingJSXElement);
        this.setData("inAssignment", inAssignment);
        this.setData("inAttribute", inAttribute);
        this.setData("inCallExpression", inCallExpression);
        this.setData("inReturnStatement", inReturnStatement);


        let needsWrapper = inAttribute || inAssignment || inCollection;
        let containerNeedsWrapper = containingJSXElement ?
          containingJSXElement.getData("containerNeedsWrapper") || containingJSXElement.getData("needsWrapper") :
          false;

        if (!needsWrapper && !containingJSXElement) {
          // Determine if there are JSXElements in a higher scope.
          needsWrapper = findOtherJSX(this);
        }

        this.setData("containerNeedsWrapper", containerNeedsWrapper);
        this.setData("needsWrapper", needsWrapper);

        // Tie a child JSXElement's eager declarations with the parent's, so
        // so all declarations come before the element.
        const eagerDeclarators = (containingJSXElement) ?
          containingJSXElement.getData("eagerDeclarators") :
          [];
        this.setData("eagerDeclarators", eagerDeclarators);
      },

      exit(node, parent, scope, file) {
        const {
          containerNeedsWrapper,
          containingJSXElement,
          eagerDeclarators,
          inAssignment,
          inAttribute,
          inCallExpression,
          inReturnStatement,
          needsWrapper
        } = this.data;

        const eager = needsWrapper || containerNeedsWrapper;

        // Filter out empty children, and transform JSX expressions
        // into normal expressions.
        const openingElement = node.openingElement;
        const closingElement = node.closingElement;
        const children = buildChildren(t, scope, file, node.children, eager);

        let elements = [ openingElement, ...children ];
        if (closingElement) { elements.push(closingElement); }

        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        if (t.isJSXElement(parent)) {
          // If the parent needs to be wrapped, we need to place our eager
          // child expressions outside the wrapper.
          if (containerNeedsWrapper) {
            elements = filterEagerDeclarators(t, elements, eagerDeclarators);
          }
          return elements;
        }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (containingJSXElement && !needsWrapper) {
          let sequence = t.sequenceExpression(elements);
          // Mark this sequence as a JSX Element so we can avoid an unnecessary
          // renderArbitrary call.
          sequence._wasJSX = true;
          return sequence;
        }

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        if (!(inReturnStatement || inAssignment || inCallExpression || containingJSXElement)) {
          this.dangerouslyRemove();
          return;
        }

        // Transform (recursively) any sequence expressions into a series of
        // statements.
        elements = flattenExpressions(t, elements);

        // If we need to wrap this JSX element in a wrapper, we must place
        // any eagerly evaluated child expressions outside the wrapper.
        if (needsWrapper) {
          elements = filterEagerDeclarators(t, elements, eagerDeclarators);
        }


        if (eagerDeclarators.length && !containingJSXElement) {
          // Find the closest statement, and insert our eager declarations
          // before it.
          let parentStatement = this.findParent((path) => {
            return path.isStatement();
          });
          let declaration = t.variableDeclaration("let", eagerDeclarators);
          let [path] = parentStatement.insertBefore(declaration);
          // Add our eager declarations to the scopes tracked bindings.
          scope.registerBinding("let", path);
        }

        // Ensure the last statement returns the DOM element.
        elements = statementsWithReturnLast(t, elements);

        if (needsWrapper) {
          // Create a wrapper around our element, and mark it as a one so later
          // child expressions can identify and "render" it.
          const jsxWrapperRef = injectJSXWrapper(t, file);
          const wrapper = toFunctionCall(t, jsxWrapperRef, [
            t.functionExpression(null, [], t.blockStatement(elements))
          ])
          wrapper._wasJSX = true;
          return wrapper;
        }

        // This is the main JSX element. Replace the return statement
        // will all the nested calls, returning the main JSX element.
        this.parentPath.replaceWithMultiple(elements);
      }
    },

    JSXOpeningElement: {
      exit(node, parent, scope, file) {
        const tag = toReference(t, node.name);
        const args = [tag];
        const elementFunction = (node.selfClosing) ? "elementVoid" : "elementOpen";

        // Only eagerly evaluate our attributes if we will be wrapping the element.
        const JSXElement = this.parentPath;
        const eager = JSXElement.getData("needsWrapper") || JSXElement.getData("containerNeedsWrapper");

        let {
          key,
          statics,
          attrs,
          attributeDeclarators,
          hasSpread
        } = extractOpenArguments(t, scope, node.attributes, eager);

        // Push any eager attribute declarators onto the element's list of
        // eager declarations.
        JSXElement.getData("eagerDeclarators").push(...attributeDeclarators);

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
