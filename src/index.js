import rootJSX, { isRootOrDescendant } from "./helpers/root-jsx";
import { setupInjector, injectHelpers } from "./helpers/inject";
import { setupHoists, hoist, addHoistedDeclarator, generateHoistName } from "./helpers/hoist";
import { isCompletionRecord } from "./helpers/completion-records";

import expressionExtractor from "./helpers/extract-expressions";
import expressionInliner from "./helpers/inline-expressions";

import injectJSXWrapper from "./helpers/runtime/jsx-wrapper";

import toFunctionCall from "./helpers/ast/to-function-call";
import iDOMMethod from "./helpers/idom-method";
import flattenExpressions from "./helpers/ast/flatten-expressions";
import statementsWithReturnLast from "./helpers/ast/statements-with-return-last";

import elementOpenCall from "./helpers/element-open-call";
import elementCloseCall from "./helpers/element-close-call";
import buildChildren from "./helpers/build-children";
import { hasSkip } from "./helpers/attributes";

import JSX from "@babel/plugin-syntax-jsx";

import * as messages from "./messages";

export default function ({ types: t }) {
  const elementVisitor = {
    JSXNamespacedName(path) {
      if (!this.opts.namespaceAttributes || path.parentPath.isJSXOpeningElement()) {
        throw path.buildCodeFrameError("JSX Namespaces aren't supported.");
      }
    },

    JSXElement: {
      enter(path) {
        this.elementVarsStack.push([]);
        const secondaryTree = !isRootOrDescendant(path, this);
        const needsWrapper = secondaryTree || !isCompletionRecord(path, this);

        // If this element needs to be wrapped in a closure, we need to transform
        // it's children without wrapping them.
        if (needsWrapper) {
          // If this element needs a closure wrapper, we need a new array of
          // closure parameters.
          this.closureVarsStack.push([]);

          path.traverse(expressionExtractor, this);
          path.traverse(elementVisitor, this);
        }
      },

      exit(path) {
        const { replacedElements } = this;
        const secondaryTree = !isRootOrDescendant(path, this);
        const needsWrapper = secondaryTree || !isCompletionRecord(path, this);

        const { parentPath } = path;
        const explicitReturn = parentPath.isReturnStatement();
        const implicitReturn = parentPath.isArrowFunctionExpression();
        const openingElementPath = path.get("openingElement");

        const openingElement = elementOpenCall(openingElementPath, this);
        const closingElement = elementCloseCall(openingElementPath, this);
        const elementVars = this.elementVarsStack.pop();
        const isSkipping = hasSkip(openingElementPath.get("attributes"), this);
        const children =  isSkipping ?
          [toFunctionCall(iDOMMethod("skip", this), [])] :
          buildChildren(path.get("children"), this);

        let elements = [ ...elementVars, openingElement, ...children ];
        if (closingElement) { elements.push(closingElement); }

        // Expressions Containers must contain an expression and not statements.
        // This will be flattened out into statements later.
        if (!needsWrapper && (implicitReturn || parentPath.isJSXExpressionContainer())) {
          const sequence = t.sequenceExpression(elements);
          path.replaceWith(sequence);
          replacedElements.add(path);
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
          const closureVars = this.closureVarsStack.pop();
          const params = closureVars.map((e) => e.id);
          let wrapper = addHoistedDeclarator(
            path.scope,
            generateHoistName(path.get("openingElement"), "wrapper"),
            t.functionExpression(null, params, t.blockStatement(elements)),
            this
          );

          // If we're the direct child of a JSXAttribute, we have to wrap the wrapper
          // call in an expression container.
          if (parentPath.isJSXAttribute()) {
            path.replaceWith(t.jSXExpressionContainer(t.jSXEmptyExpression()));
            path = path.get("expression");
          }

          const args = [ wrapper ];
          if (closureVars.length) {
            const paramArgs = closureVars.map((e) => e.init);
            args.push(t.arrayExpression(paramArgs));
          }

          const wrapperCall = toFunctionCall(injectJSXWrapper(this), args);
          replacedElements.add(path);
          path.replaceWith(wrapperCall);
          return;
        }


        // This is the main JSX element. Replace the return statement
        // with all the nested calls, returning the main JSX element.
        if (explicitReturn) {
          parentPath.replaceWithMultiple(elements);
          replacedElements.add(parentPath);
        } else {
          replacedElements.add(path);
          path.replaceWithMultiple(elements);
        }
      }
    }
  };

  // This visitor first finds the root element, and ignores all the others.
  return {
    inherits: JSX,

    visitor: {
      Program: {
        enter(path) {
          if (this.opts.prefix) {
            throw new Error(messages.prefixOptionRemoved);
          }
          if (this.opts.runtime) {
            throw new Error(messages.runtimeOptionRemoved);
          }

          if (this.opts.inlineExpressions) {
            path.traverse(expressionInliner, this);
          }
          setupInjector(this);
          setupHoists(this);
        },

        exit(path) {
          hoist(path, this);
          injectHelpers(this);
        }
      },

      JSXElement: {
        exit(path) {
          const parent = path.findParent((p) => p.isFunction() || p.isProgram());
          const root = rootJSX(parent, this);

          if (!root || root.getFunctionParent() === parent) {
            const state = {
              replacedElements: new WeakSet(),
              fastRoots: new WeakSet(),
              closureVarsStack: [],
              elementVarsStack: [],
              file: this.file,
              opts: this.opts,
            };
            parent.traverse(elementVisitor, state);
          }
        }
      }
    }
  };
}
