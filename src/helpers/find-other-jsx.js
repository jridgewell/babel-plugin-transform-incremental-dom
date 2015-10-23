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
    state.isRoot = false;
    this.stop();
  }
};

export default function isRootJSX(path) {
  let state = { isRoot: true, node: path.node };

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.isRoot = false;
    } else if (path.isFunctionParent()) {
      path.traverse(jsxVisitor, state);
    }

    // End early if another JSXElement is found.
    return !state.isRoot;
  });

  return state.isRoot;
}
