import LimitedMap from "./map";

const rootMap = new LimitedMap(25);

function isReturned(path) {
  const parent = path.parentPath;
  return parent.isReturnStatement() || parent.isArrowFunctionExpression();
}

const rootElementFinder = {
  JSXElement(path, state) {
    const { jsx, crossedFunction } = state;

    // No need to traverse our JSX element.
    if (path === jsx) {
      path.skip();
      return;
    }

    const returned = isReturned(jsx);
    const otherIsReturned = isReturned(path);

    // We're looking for a root element, which must be returned by the function.
    if (otherIsReturned && (crossedFunction || !returned)) {
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
  if (rootMap.has(path)) {
    return rootMap.get(path);
  }

  const state = {
    root: true,
    crossedFunction: false,
    jsx: path
  };

  path.findParent((path) => {
    if (path.isJSXElement()) {
      state.root = false;
    } else if (path.isFunction() || path.isProgram()) {
      path.traverse(rootElementFinder, state);
      state.crossedFunction = true;
    }

    // End early if another JSXElement is found.
    return !state.root;
  });

  rootMap.set(path, state.root);
  return state.root;
}
