import isReturned from "./is-returned";
import useFastRoot from "./fast-root";
import moduleSource from "./module-source";

const rootMap = new WeakMap();
const patchRootsMap = new WeakMap();

const rootElementFinder = {
  JSXElement(path) {
    const { crossedFunction } = this;

    // No need to traverse our JSX element.
    if (path === root) {
      path.skip();
      return;
    }

    // We're looking for a root element, which must be returned by the function.
    if (crossedFunction && isReturned(path)) {
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

  let patchRoots = patchRootsMap.get(plugin.file);
  if (!patchRoots) {
    const importSource = moduleSource(plugin);
    if (!importSource) {
      patchRootsMap.set(plugin.file, []);
      return true;
    }

    const patchCalls = [];
    const { imports } = file.metadata.modules;
    const iDOMImport = imports.find((imported) => {
      return imported.source === importSource;
    });

    // Gather all the patch calls
    if (iDOMImport && iDOMImport.imported.indexOf("patch") > -1) {
      const patchImport = iDOMImport.specifiers.find((imported) => {
        return imported.imported === "patch";
      });
      const binding = file.scope.getBinding(patchImport.local);

      binding.referencePaths.forEach((reference) => {
        const { parentPath } = reference;
        if (parentPath.isCallExpression()) {
          patchCalls.push(parentPath);
        }
      });
    } else if (iDOMImport && iDOMImport.imported.indexOf("*") > -1) {
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
              patchCalls.push(grandParentPath);
            }
          }
        }
      });
    }

    // Now, gather the renderer function that is the second param.
    patchRoots = patchCalls.reduce((roots, call) => {
      const renderer = call.get("arguments.1");
      if (!renderer) {
        return roots;
      }

      if (renderer.isFunction()) {
        roots.push(renderer);
      } else if (renderer.isIdentifier()) {
        const { name } = renderer.node;
        const binding = renderer.scope.getBinding(name);
        if (binding) {
          roots.push(binding.path);
        }
      }

      return roots;
    }, []);
    patchRootsMap.set(plugin.file, patchRoots);
  }

  return !patchRoots.length || path.findParent((parent) => {
    return patchRoots.indexOf(parent) > -1;
  });
}

// Detects if this JSX element is the root element.
// It is not the root if there is another root element in this
// or a higher function scope.
export default function isRootJSX(path, plugin) {
  const state = {
    root: null,
    crossedFunction: false
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
      if (rootMap.has(path)) {
        state.root = rootMap.get(path);
      } else {
        path.traverse(rootElementFinder, state);
        rootMap.set(path, state.root);
      }

      state.crossedFunction = true;
    }

    // End early if another JSXElement is found.
    return state.root;
  });

  return !state.root || state.root === path;
}
