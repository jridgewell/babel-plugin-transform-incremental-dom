import isReturned from "./is-returned";
import useFastRoot from "./fast-root";
import patchRoots from "./patch-roots";

const rootMap = new WeakMap();

const rootElementFinder = {
  JSXElement(path) {
    // We're looking for a root element, which must be returned by the function.
    if (isReturned(path) && inPatchRoot(path, this)) {
      this.root = path;
      path.stop();
    }
  },

  // Don't traverse into other functions, since they cannot contain the root.
  Function(path) {
    path.skip();
  }
};

// Determines if the JSX element is nested inside a patch's rendering function.
function inPatchRoot(path, plugin) {
  const { opts } = plugin;
  if (useFastRoot(path, opts)) {
    return true;
  }

  const roots = patchRoots(plugin)
  return !roots.length || path.findParent((parent) => {
    return roots.indexOf(parent) > -1;
  });
}

// Determines if this element is the root element or descends directly from it.
export function isRootOrDescendant(path, plugin) {
  const parent = path.getFunctionParent();
  const root = rootJSX(path, plugin);

  if (!root) {
    return false;
  }

  const enclosing = path.findParent((path) => {
    return path.isJSXElement() || path.isJSXAttribute();
  });

  if (enclosing) {
    if (enclosing.isJSXAttribute()) {
      // Attributes cannot contain a root.
      return false;
    } else {
      // Technically, not true. But we consider any element that directly
      // descends from another to be in a "root". The actual ancestor element
      // may eventually be wrapped if it's not a root.
      return true;
    }
  }

  if (root === path) {
    return true;
  }

  if (root.getFunctionParent() !== parent) {
    return false;
  }

  // We can have multiple roots at the same level.
  return isReturned(path);
}

// Finds the root JSX Element in this scope an all higher scopes.
export default function rootJSX(path, plugin) {
  if (rootMap.has(path)) {
    return rootMap.get(path);
  }

  const state = Object.assign({}, plugin, {
    root: null,
  });

  let root;
  const top = path.find((path) => {
    if (path.isFunction() || path.isProgram()) {
      state.root = null;
      if (rootMap.has(path)) {
        root = rootMap.get(path);
        return true;
      } else {
        path.traverse(rootElementFinder, state);
        if (state.root) {
          root = state.root;
        }
        rootMap.set(path, state.root);
      }
    }
  });

  if (root) {
    const stop = top || root.getFunctionParent();
    path.find((path) => {
      if (path === stop) {
        return true;
      }

      if (path.isFunction() || path.isProgram()) {
        rootMap.set(path, root);
      }
    });
  }

  return root;
}
