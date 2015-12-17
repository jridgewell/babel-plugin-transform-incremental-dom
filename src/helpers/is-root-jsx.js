const jsxVisitor = {
  JSXElement(path, state) {
    if (path.node === state.jsxNode) {
      path.skip();
    } else {
      const { parentPath } = path;
      const returned = parentPath.isReturnStatement() || parentPath.isArrowFunctionExpression();
      if (returned) {
        state.root = false;
        path.stop();
      }
    }
  },

  Function(path) {
    path.skip();
  }
};

// Detects if there are other JSXElements in a higher scope.
export default function isRootJSX(path) {
  let state = { root: true, jsxNode: path.node };

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.root = false;
    } else if (path.isFunction() || path.isProgram()) {
      path.traverse(jsxVisitor, state);
    }

    // End early if another JSXElement is found.
    return !state.root;
  });

  return state.root;
}
