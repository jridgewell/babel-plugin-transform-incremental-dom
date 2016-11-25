import toReference from "./ast/to-reference";
import path from "path";
import { deprecate } from "util";

const prefixedMethod = deprecate(function prefixedMethod(prefix, method) {
  return toReference(`${prefix}.${method}`);
}, "babel-plugin-incremental-dom: `prefix` option has been deprecated. Please use `moduleSource` instead.");

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, plugin) {
  const { opts, file } = plugin;
  const prefix = opts.prefix || "";

  if (prefix) {
    return prefixedMethod(prefix, method);
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
