import toReference from "./ast/to-reference";
import resolvePath from "./resolve-path";

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, plugin) {
  const { opts, file } = plugin;
  let { moduleSource } = opts;

  if (moduleSource) {
    moduleSource = resolvePath(file.opts.filename, moduleSource);
  } else {
    // See if we can find the incremental-dom import.
    const { imports } = file.metadata.modules;
    const imported = imports.find((imported) => {
      return imported.source === "incremental-dom";
    });

    if (imported) {
      moduleSource = "incremental-dom";
    }
  }

  if (moduleSource) {
    return file.addImport(moduleSource, method);
  }

  return toReference(method);
}
