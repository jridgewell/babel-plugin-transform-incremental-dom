const jsxVisitor = {
  shouldSkip(path) {
    // Don't descend into the current JSXElement.
    return path.node === path.state.node;
  },

  JSXElement(node, parent, scope, state) {
    state.otherJSX = true;
    this.stop();
  }
};

// Detects if there are other JSXElements in a higher scope.
export default function findOtherJSX(path) {
  let state = { otherJSX: false, node: path.node };

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.node = path.node;
    } else if (path.isFunction()) {
      path.parentPath.traverse(jsxVisitor, state);
    } else if (path.isProgram()) {
      path.traverse(jsxVisitor, state);
    }

    // End early if another JSXElement is found.
    return state.otherJSX;
  });

  return state.otherJSX;
}
