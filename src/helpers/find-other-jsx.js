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

  JSXElement(node, parent, scope, state) {
    state.otherJSX = true;
    this.stop();
  },

  CallExpression(node, parent, scope, state) {
    if (node._iDOMisRoot) {
      state.otherJSX = true;
      this.stop();
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
