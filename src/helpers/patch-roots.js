import collectImports from "./collect-imports";
import moduleSource from "./module-source";

const patchRootsMap = new WeakMap();

// Gathers the function nodes that are passed into the iDOM `patch` function.
export default function patchRoots(plugin) {
  const { file } = plugin;

  let patchRoots = patchRootsMap.get(file);
  if (!patchRoots) {
    const importSource = moduleSource(plugin);
    if (!importSource) {
      patchRootsMap.set(file, []);
      return [];
    }

    const patchCalls = [];
    const imports = collectImports(file.path);
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
    patchRootsMap.set(file, patchRoots);
  }

  return patchRoots;
}
