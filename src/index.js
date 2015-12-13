import toFunctionCall from "./helpers/ast/to-function-call";

import buildChildren from "./helpers/build-children";
import findOtherJSX from "./helpers/find-other-jsx";
import flattenExpressions from "./helpers/flatten-expressions";
import statementsWithReturnLast from "./helpers/statements-with-return-last";
import { addHoistedDeclarator, setupHoists, hoist } from "./helpers/hoist";
import elementOpenCall from "./helpers/element-open-call";
import elementCloseCall from "./helpers/element-close-call";

import { setupInjector, injectHelpers } from "./helpers/inject";
import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

export default function ({ types: t }) {
  return { visitor: {
    Program: {
      enter() {
        setupInjector(this);
        setupHoists(this);
      },

      exit(path) {
        hoist(t, path, this);
        injectHelpers(this);
      }
    },

    JSXElement: {
      enter(path) {
        let inAssignment = false;
        let inAttribute = false;
        let inCallExpression = false;
        let inCollection = false;
        let inReturnStatement = false;
        let containingJSXElement;
        let last = path;

        path.findParent((path) => {
          if (path.isJSXElement()) {
            containingJSXElement = path;
            return true;
          }
          if (path.isArrowFunctionExpression()) {
            inReturnStatement = inReturnStatement || !path.get("body").isBlockStatement();
            return true;
          }
          if (path.isFunction() || path.isProgram()) {
            return true;
          }
          if (path.isSequenceExpression()) {
            const expressions = path.get("expressions");
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
          last = path;
        });

        // Values are useless if they aren't assigned.
        // ```
        //   var a = 1;
        //   <div /> // Useless JSX node
        // ```
        if (!(inReturnStatement || inAssignment || inCallExpression || containingJSXElement)) {
          throw path.buildCodeFrameError("Unused JSX Elements aren't supported.");
        }

        const containerNeedsWrapper = (containingJSXElement) ?
          containingJSXElement.getData("containerNeedsWrapper") || containingJSXElement.getData("needsWrapper") :
          false;
        let needsWrapper = inAttribute || inAssignment || inCollection || inCallExpression;
        if (!containingJSXElement && !needsWrapper) {
          // Determine if there are JSXElements in a higher scope.
          needsWrapper = findOtherJSX(path);
        }

        // Tie a child JSXElement's eager declarations with the parent's, so
        // so all declarations come before the element.
        const eagerExpressions = (containingJSXElement && !needsWrapper) ?
          containingJSXElement.getData("eagerExpressions") :
          [];

        path.setData("containerNeedsWrapper", containerNeedsWrapper);
        path.setData("containingJSXElement", containingJSXElement);
        path.setData("eagerExpressions", eagerExpressions);
        path.setData("needsWrapper", needsWrapper);
      },

      exit(path) {
        const {
          containerNeedsWrapper,
          containingJSXElement,
          eagerExpressions,
          needsWrapper,
        } = path.data;

        const { parentPath, scope } = path;
        const eager = needsWrapper || containerNeedsWrapper;
        const explicitReturn = parentPath.isReturnStatement();
        const implicitReturn = parentPath.isArrowFunctionExpression();

        // Filter out empty children, and transform JSX expressions
        // into normal expressions.
        const openingElement = elementOpenCall(t, path.get("openingElement"), this);
        const closingElement = elementCloseCall(t, path.get("openingElement"), this);

        const {
          children,
          eagerChildren
        } = buildChildren(t, scope, this, path.get("children"), { eager });

        eagerExpressions.push(...eagerChildren);

        let elements = [ openingElement, ...children ];
        if (closingElement) { elements.push(closingElement); }

        // If we're inside a JSX node, flattening expressions
        // may force us into an unwanted function scope.
        if (parentPath.isJSXElement()) {
          path.replaceWithMultiple(elements);
          return;
        }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (containingJSXElement && !needsWrapper) {
          const sequence = t.sequenceExpression(elements);
          // Mark this sequence as a JSX Element so we can avoid an unnecessary
          // renderArbitrary call.
          sequence._iDOMwasJSX = true;
          path.replaceWith(sequence);
          return;
        }

        if (explicitReturn || implicitReturn || needsWrapper) {
          // Transform (recursively) any sequence expressions into a series of
          // statements.
          elements = flattenExpressions(t, elements);

          // Ensure the last statement returns the DOM element.
          elements = statementsWithReturnLast(t, elements);
        }

        if (needsWrapper) {
          // Create a wrapper around our element, and mark it as a one so later
          // child expressions can identify and "render" it.
          const params = eagerExpressions.map((e) => e.ref);
          const wrapper = t.functionExpression(null, params, t.blockStatement(elements));
          const hoistedWrapper = addHoistedDeclarator(t, scope, "wrapper", wrapper, this);

          const args = [ hoistedWrapper ];
          if (eagerExpressions.length) {
            const paramArgs = eagerExpressions.map((e) => e.value);
            args.push(t.arrayExpression(paramArgs));
          }

          const wrapperCall = toFunctionCall(t, injectJSXWrapper(t, this), args);
          wrapperCall._iDOMwasJSX = true;
          path.replaceWith(wrapperCall);
          return;
        }

        openingElement._iDOMisRoot = true;

        // This is the main JSX element. Replace the return statement
        // with all the nested calls, returning the main JSX element.
        if (explicitReturn) {
          parentPath.replaceWithMultiple(elements);
        } else {
          path.replaceWithMultiple(elements);
        }
      }
    },

    JSXNamespacedName(path) {
      throw path.buildCodeFrameError("JSX Namespaces aren't supported.");
    }
  }};
}
