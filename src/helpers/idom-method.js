import toReference from "./ast/to-reference";

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, plugin) {
  const { opts, file } = plugin;
  const prefix = opts.prefix || "";

  if (prefix) {
    return toReference(`${prefix}.${method}`);
  }

  const { imports } = file.metadata.modules;
  const imported = imports.find((imported) => {
    return imported.source === "incremental-dom";
  });

  if (imported) {
    return file.addImport(imported.source, method);
  }

  return toReference(method);
}
