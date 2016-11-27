import isReturned from "./is-returned";

const map = new WeakMap();

const rootElementFinder = {
  JSXElement(path) {
    const { jsx, crossedFunction } = this;

    // No need to traverse our JSX element.
    if (path === jsx) {
      path.skip();
      return;
    }

    const returned = isReturned(jsx);
    const otherIsReturned = isReturned(path);

    // We're looking for a root element, which must be returned by the function.
    if (otherIsReturned && (crossedFunction || !returned)) {
      this.root = path;
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
  let state = {
    root: null,
    crossedFunction: false,
    jsx: path
  };

  if (!path.isJSX() && path.getFunctionParent().isProgram()) {
    return true;
  }

  if (!isReturned(path)) {
    return false;
  }

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.root = path;
    } else if (path.isFunction() || path.isProgram()) {
      if (map.has(path)) {
        state.root = map.get(path);
      } else {
        path.traverse(rootElementFinder, state);
        map.set(path, state.root);
      }

      state.crossedFunction = true;
    }

    // End early if another JSXElement is found.
    return state.root;
  });

  return !state.root || state.root === path;
}
