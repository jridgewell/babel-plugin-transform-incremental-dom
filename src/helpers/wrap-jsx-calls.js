import { jsxAncestor } from "./ancestory";
import isRootJSX from "./is-root-jsx";
import injectJSXWrapper from "./runtime/jsx-wrapper";
import toFunctionCall from "./ast/to-function-call";
import * as t from "babel-types";

export const wrappedJSXCalls = new Set();
const considered = new WeakSet();

export function collectJSXCalls(path, plugin) {
  const id = path.node.id;
  if (id) {
    const binding = path.scope.getBinding(id.name);

    if (binding) {
      binding.referencePaths.reverse().forEach((path) => {
        if (path.key === "callee") {
          const { parentPath } = path;
          if (considered.has(path)) {
            return;
          }
          considered.add(path);

          const parent = jsxAncestor(parentPath, plugin);
          if (isRootJSX(parent || parentPath)) {
          // if ((parent && parent.isJSXElement()) ||  isRootJSX(parent || parentPath)) {
            collectJSXCalls(path.getFunctionParent(), plugin);
            return;
          }

          if (parentPath.parentPath.isJSXExpressionContainer()) {
            wrappedJSXCalls.add(path);
            return;
          }

          wrapJSXCall(path, plugin);
        }
      });
    }
  }
}

export function wrapJSXCalls(plugin) {
  wrappedJSXCalls.forEach((path) => wrapJSXCall(path, plugin));
  wrappedJSXCalls.clear();
}

function wrapJSXCall(path, plugin) {
  const { parentPath } = path;
  const { callee, arguments: args } = parentPath.node;
  const params = [ callee ];
  if (args.length) {
    params.push(t.arrayExpression(args));
  }

  parentPath.replaceWith(toFunctionCall(injectJSXWrapper(plugin), params));
}
