import isRootJSX from "./helpers/is-root-jsx";
import isChildElement from "./helpers/is-child-element";
import { setupInjector, injectHelpers } from "./helpers/inject";
import { setupHoists, hoist, addHoistedDeclarator } from "./helpers/hoist";

import expressionExtractor from "./helpers/extract-expressions";

import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

import toFunctionCall from "./helpers/ast/to-function-call";
import flattenExpressions from "./helpers/ast/flatten-expressions";
import statementsWithReturnLast from "./helpers/ast/statements-with-return-last";

import elementOpenCall from "./helpers/element-open-call";
import elementCloseCall from "./helpers/element-close-call";
import buildChildren from "./helpers/build-children";


export default function ({ types: t }) {
  const elementVisitor = {
    JSXNamespacedName(path) {
      throw path.buildCodeFrameError("JSX Namespaces aren't supported.");
    },

    JSXElement: {
      enter(path) {
        let { secondaryTree, root, replacedElements } = this;
        const needsWrapper = root !== path && !isChildElement(path);

        // If this element needs a closure wrapper, we need a new array of
        // closure parameters. Otherwise, use the parent's, since it may need
        // a closure wrapper.
        const closureVars = needsWrapper ? [] : this.closureVars || [];

        path.setData("closureVars", closureVars);

        // If this element needs to be wrapped in a closure, we need to transform
        // it's children without wrapping them.
        if (secondaryTree || needsWrapper) {
          const { opts, file } = this;
          const state = { secondaryTree: false, root: path, replacedElements, closureVars, opts, file };
          path.traverse(expressionExtractor, state);
          path.traverse(elementVisitor, state);
        }
      },

      exit(path) {
        const hoist = this.opts.hoist;
        const { root, secondaryTree, replacedElements } = this;
        const isChild = isChildElement(path);
        const needsWrapper = root !== path && !isChild;
        const eager = secondaryTree || needsWrapper;
        const closureVars = path.getData("closureVars");

        const { parentPath } = path;
        const explicitReturn = parentPath.isReturnStatement();
        const implicitReturn = parentPath.isArrowFunctionExpression();

        const openingElement = elementOpenCall(t, path.get("openingElement"), this, { eager, hoist });
        const closingElement = elementCloseCall(t, path.get("openingElement"), this);
        const children = buildChildren(t, path.get("children"), this);

        let elements = [ openingElement, ...children ];
        if (closingElement) { elements.push(closingElement); }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (isChild) {
          const sequence = t.sequenceExpression(elements);
          // Mark this sequence as a JSX Element so we can avoid an unnecessary
          // renderArbitrary call.
          replacedElements.add(sequence);
          path.replaceWith(sequence);
          return;
        }

        if (explicitReturn || implicitReturn || secondaryTree || needsWrapper) {
          // Transform (recursively) any sequence expressions into a series of
          // statements.
          elements = flattenExpressions(t, elements);

          // Ensure the last statement returns the DOM element.
          elements = statementsWithReturnLast(t, elements);
        }

        if (secondaryTree || needsWrapper) {
          // Create a wrapper around our element, and mark it as a one so later
          // child expressions can identify and "render" it.
          const params = closureVars.map((e) => e.param);
          let wrapper = t.functionExpression(null, params, t.blockStatement(elements));

          if (hoist) {
            wrapper = addHoistedDeclarator(t, path.scope, "wrapper", wrapper, this);
          }

          const args = [ wrapper ];
          if (closureVars.length) {
            const paramArgs = closureVars.map((e) => e.arg);
            args.push(t.arrayExpression(paramArgs));
          }

          const wrapperCall = toFunctionCall(t, injectJSXWrapper(t, this), args);
          replacedElements.add(wrapperCall);
          path.replaceWith(wrapperCall);
          return;
        }

        // This is the main JSX element. Replace the return statement
        // with all the nested calls, returning the main JSX element.
        if (explicitReturn) {
          parentPath.replaceWithMultiple(elements);
        } else {
          path.replaceWithMultiple(elements);
        }
      }
    }
  };

  // This visitor first finds the root element, and ignores all the others.
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

    JSXElement(path) {
      const isRoot = isRootJSX(path);

      if (isRoot) {
        const { opts, file } = this;
        const replacedElements = new Set();
        const state = { secondaryTree: false, root: path, replacedElements, opts, file };

        path.parentPath.traverse(elementVisitor, state);

        state.secondaryTree = true;
        const parent = path.getFunctionParent();
        parent.traverse(elementVisitor, state);
      } else {
        path.skip();
      }
    }
  }};
}
