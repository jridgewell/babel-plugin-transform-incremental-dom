import isReturned from "./is-returned";
import useFastRoot from "./use-fast-root";
import moduleSource from "./module-source";

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

function inPatchRoot(path, plugin) {
  const { opts, file } = plugin;
  if (useFastRoot(path, opts)) {
    return true;
  }

  const importSource = moduleSource(plugin);
  if (!importSource) {
    return true;
  }

  const patchRoots = [];
  const { imports } = file.metadata.modules;
  const iDOMImport = imports.find((imported) => {
    return imported.source === importSource;
  });

  if (iDOMImport && iDOMImport.imported.includes('patch')) {
    const patchImport = iDOMImport.specifiers.find((imported) => {
      return imported.imported === "patch";
    });
    const binding = file.scope.getBinding(patchImport.local);

    binding.referencePaths.forEach((reference) => {
      const { parentPath } = reference;
      if (parentPath.isCallExpression()) {
        patchRoots.push(parentPath);
      }
    });
  } else if (iDOMImport && iDOMImport.imported.includes('*')) {
    const starImport = iDOMImport.specifiers.find((imported) => {
      return imported.kind === "namespace";
    });
    const binding = file.scope.getBinding(starImport.local);

    binding.referencePaths.forEach((reference) => {
      const { parentPath } = reference;
      if (parentPath.isMemberExpression()) {
        const property = parentPath.get("property");
        if (property.isIdentifier({ name: "patch" })) {
          const grandParentPath = parentPath.parentPath;
          if (grandParentPath.isCallExpression()) {
            patchRoots.push(grandParentPath);
          }
        }
      }
    });
  }


  return !patchRoots.length || path.findParent((parent) => {
    return patchRoots.includes(parent);
  });
}

// Detects if this JSX element is the root element.
// It is not the root if there is another root element in this
// or a higher function scope.
export default function isRootJSX(path, plugin) {
  const state = {
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

  if (!inPatchRoot(path, plugin)) {
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
