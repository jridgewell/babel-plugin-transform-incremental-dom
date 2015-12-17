import isRootJSX from "./helpers/is-root-jsx";
import { setupInjector, injectHelpers } from "./helpers/inject";
import { setupHoists, hoist, addHoistedDeclarator } from "./helpers/hoist";
import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

import toFunctionCall from "./helpers/ast/to-function-call";
import isLiteralOrUndefined from "./helpers/ast/is-literal-or-undefined";
import flattenExpressions from "./helpers/ast/flatten-expressions";
import statementsWithReturnLast from "./helpers/ast/statements-with-return-last";

import elementOpenCall from "./helpers/element-open-call";
import elementCloseCall from "./helpers/element-close-call";
import buildChildren from "./helpers/build-children";


function elementNeedsWrapper(path) {
  let isChild = false;
  path.findParent((path) => {
    if (path.isJSXElement()) {
      isChild = true;
      return true;
    }
    return !path.isJSXExpressionContainer();
  });

  return !isChild;
}

export default function ({ types: t }) {
  const elementVisitor = {
    JSXNamespacedName(path) {
      throw path.buildCodeFrameError("JSX Namespaces aren't supported.");
    },

    JSXElement: {
      enter(path) {
        let { secondaryTree, root, replacedElements } = this;
        const needsWrapper = root !== path && elementNeedsWrapper(path);
        const eagerExpressions = needsWrapper ? [] : this.eagerExpressions || [];

        path.setData("eagerExpressions", eagerExpressions);

        if (secondaryTree || needsWrapper) {
          const { opts, file } = this;
          const state = { secondaryTree: false, root, replacedElements, eagerExpressions, opts, file };
          path.traverse(eagernessVisitor, state);
          path.traverse(elementVisitor, state);
        }
      },

      exit(path) {
        const hoist = this.opts.hoist;
        const { root, secondaryTree, replacedElements } = this;
        const needsWrapper = root !== path && elementNeedsWrapper(path);
        const eager = secondaryTree || needsWrapper;
        const eagerExpressions = path.getData("eagerExpressions");

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
        if (!elementNeedsWrapper(path)) {
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
          const params = eagerExpressions.map((e) => e.ref);
          const wrapper = t.functionExpression(null, params, t.blockStatement(elements));
          const hoistedWrapper = addHoistedDeclarator(t, path.scope, "wrapper", wrapper, this);

          const args = [ hoistedWrapper ];
          if (eagerExpressions.length) {
            const paramArgs = eagerExpressions.map((e) => e.value);
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

  const eagernessVisitor = {
    // Ensure that elements are transformed before we eagerly extract the
    // references.
    // JSXElement: elementVisitor.JSXElement,

    JSXSpreadAttribute: {
      enter(path) {
        const argument = path.get("argument");
        const node = argument.node;
        let ref = node;
        if (!t.isIdentifier(node)) {
          ref = path.scope.generateUidIdentifierBasedOnNode(node);
        }

        this.eagerExpressions.push({ ref, value: node });
        argument.replaceWith(ref);
      }
    },

    JSXExpressionContainer: {
      enter(path) {
        const expression = path.get("expression");
        const node = expression.node;
        if (isLiteralOrUndefined(t, node) || expression.isJSXElement()) {
          return;
        }

        let ref = node;
        if (!t.isIdentifier(node)) {
          ref = path.scope.generateUidIdentifierBasedOnNode(node);
        }

        this.eagerExpressions.push({ ref, value: node });
        expression.replaceWith(ref);
      }
    }
  };

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
