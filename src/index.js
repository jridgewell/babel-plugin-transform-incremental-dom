import isRootJSX from "./helpers/is-root-jsx";
import isReturned from "./helpers/is-returned";
import childAncestor from "./helpers/is-child-element";
import { setupInjector, injectHelpers } from "./helpers/inject";
import { setupHoists, hoist, addHoistedDeclarator } from "./helpers/hoist";

import expressionExtractor from "./helpers/extract-expressions";
import expressionInliner from "./helpers/inline-expressions";

import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

import toFunctionCall from "./helpers/ast/to-function-call";
import flattenExpressions from "./helpers/ast/flatten-expressions";
import statementsWithReturnLast from "./helpers/ast/statements-with-return-last";

import elementOpenCall from "./helpers/element-open-call";
import elementCloseCall from "./helpers/element-close-call";
import buildChildren from "./helpers/build-children";

export default function ({ types: t, traverse: _traverse }) {
  function traverse(path, visitor, state) {
    _traverse.explode(visitor);

    const { node } = path;
    if (!node) {
      return;
    }

    const { type } = node;
    const { enter = [], exit = [] } = visitor[type] || {};

    enter.forEach((fn) => fn.call(state, path, state));
    if (!path.shouldSkip) {
      path.traverse(visitor, state);
      exit.forEach((fn) => fn.call(state, path, state));
    }
    path.shouldSkip = false;
  }

  const elementVisitor = {
    JSXNamespacedName(path) {
      if (!this.opts.namespaceAttributes || path.parentPath.isJSXOpeningElement()) {
        throw path.buildCodeFrameError("JSX Namespaces aren't supported.");
      }
    },

    JSXElement: {
      enter(path) {
        const { secondaryTree, root, closureVarsStack } = this;
        const needsWrapper = secondaryTree || (root !== path && !childAncestor(path, this));

        // If this element needs to be wrapped in a closure, we need to transform
        // it's children without wrapping them.
        if (needsWrapper) {
          // If this element needs a closure wrapper, we need a new array of
          // closure parameters.
          closureVarsStack.push([]);

          const state = Object.assign({}, this, { secondaryTree: false, root: path });
          path.traverse(expressionExtractor, state);
          path.traverse(elementVisitor, state);
        }
      },

      exit(path) {
        const { root, secondaryTree, replacedElements, closureVarsStack } = this;
        const { hoist } = this.opts;
        const childAncestorPath = childAncestor(path, this);
        const needsWrapper = secondaryTree || (root !== path && !childAncestorPath);

        const { parentPath } = path;
        const explicitReturn = parentPath.isReturnStatement();
        const implicitReturn = parentPath.isArrowFunctionExpression();

        const openingElement = elementOpenCall(path.get("openingElement"), this);
        const closingElement = elementCloseCall(path.get("openingElement"), this);
        const children = buildChildren(path.get("children"), this);

        let elements = [ openingElement, ...children ];
        if (closingElement) { elements.push(closingElement); }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (!needsWrapper && parentPath.isJSX()) {
          const sequence = t.sequenceExpression(elements);
          // Mark this sequence as a JSX Element so we can avoid an unnecessary
          // renderArbitrary call.
          replacedElements.add(sequence);
          path.replaceWith(sequence);
          return;
        }

        if (explicitReturn || implicitReturn || needsWrapper) {
          // Transform (recursively) any sequence expressions into a series of
          // statements.
          elements = flattenExpressions(elements);

          // Ensure the last statement returns the DOM element.
          elements = statementsWithReturnLast(elements);
        }

        if (needsWrapper) {
          // Create a wrapper around our element, and mark it as a one so later
          // child expressions can identify and "render" it.
          const closureVars = closureVarsStack.pop();
          const params = closureVars.map((e) => e.id);
          let wrapper = t.functionExpression(null, params, t.blockStatement(elements));

          if (hoist) {
            wrapper = addHoistedDeclarator(path.scope, "wrapper", wrapper, this);
          }

          const args = [ wrapper ];
          if (closureVars.length) {
            const paramArgs = closureVars.map((e) => e.init);
            args.push(t.arrayExpression(paramArgs));
          }

          const wrapperCall = toFunctionCall(injectJSXWrapper(this), args);
          replacedElements.add(wrapperCall);
          path.replaceWith(wrapperCall);
          return;
        }

        if (childAncestorPath) {
          replacedElements.add(childAncestorPath.node);
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

  const rootElementVisitor = {
    JSXElement(path) {
      const isRoot = isRootJSX(path);

      if (isRoot) {
        const state = Object.assign({}, this, {
          root: path,
          secondaryTree: !isReturned(path),
        });

        traverse(path, elementVisitor, state);
      } else {
        path.skip();
      }
    }
  };

  // This visitor first finds the root element, and ignores all the others.
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("jsx");
    },

    visitor: {
      Program: {
        enter(path) {
          if (this.opts.inlineExpressions) {
            path.traverse(expressionInliner);
          }
          setupInjector(this);
          setupHoists(this);
        },

        exit(path) {
          path.traverse(elementVisitor, Object.assign({}, this, {
            secondaryTree: true,
            root: null,
            replacedElements: new Set(),
            closureVarsStack: [],
          }));

          hoist(path, this);
          injectHelpers(this);
        }
      },

      Function: {
        exit(path) {
          const secondaryTree = !childAncestor(path, this);
          const state = Object.assign({}, this, {
            secondaryTree,
            root: path,
            replacedElements: new Set(),
            closureVarsStack: [],
          });

          path.traverse(rootElementVisitor, state);
          // Useless for now. Wait until fastRoot comes out.
          if (secondaryTree) {
            path.traverse(elementVisitor, state);
          }
        }
      }
    }
  };
}
