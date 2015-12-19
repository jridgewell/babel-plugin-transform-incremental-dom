const rootElementFinder = {
  JSXElement(path, state) {
    // No need to traverse our JSX element.
    if (path.node === state.jsxNode) {
      path.skip();
      return;
    }

    const { parentPath } = path;
    const returned = parentPath.isReturnStatement() || parentPath.isArrowFunctionExpression();
    // We're looking for a root element, which must be returned by the function.
    if (returned) {
      state.root = false;
      path.stop();
    }
  },

  // Don't traverse into other functions, since they cannot contain the root.
  Function(path) {
    path.skip();
  }
};

// Detects if this JSX element is the root element.
// It is not the root if there is another root element in this
// or a higher function scope.
export default function isRootJSX(path) {
  let state = { root: true, jsxNode: path.node };

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.root = false;
    } else if (path.isFunction() || path.isProgram()) {
      path.traverse(rootElementFinder, state);
    }

    // End early if another JSXElement is found.
    return !state.root;
  });

  return state.root;
}
