import toReference from "./ast/to-reference";
import path from "path";

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, plugin) {
  const { opts, file } = plugin;
  const prefix = opts.prefix || "";

  if (prefix) {
    return toReference(`${prefix}.${method}`);
  }

  let moduleSource = opts.moduleSource;

  if (moduleSource) {
    if (moduleSource.startsWith(".")) {
      moduleSource = path.relative(
        path.dirname(file.opts.filename),
        path.join(process.cwd(), moduleSource)
      );
    }
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
