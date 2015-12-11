const jsxVisitor = {
  shouldSkip(path) {
    // Don't descend into the current JSXElement.
    if (path.node === path.state.node) {
      return true;
    }

    // Don't descend into sibling functions.
    if (path.isFunction()) {
      return true;
    }
  },

  JSXElement(path, state) {
    state.otherJSX = true;
    path.stop();
  },

  CallExpression(path, state) {
    if (path.node._iDOMisRoot) {
      state.otherJSX = true;
      path.stop();
    }
  }
};

// Detects if there are other JSXElements in a higher scope.
export default function findOtherJSX(path) {
  let state = { otherJSX: false, node: path.node };

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.node = path.node;
    } else if (path.isFunction() || path.isProgram()) {
      path.traverse(jsxVisitor, state);
    }

    // End early if another JSXElement is found.
    return state.otherJSX;
  });

  return state.otherJSX;
}
