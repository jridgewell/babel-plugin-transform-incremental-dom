import toReference from "./ast/to-reference";
import moduleSource from "./module-source";

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, plugin) {
  const importSource = moduleSource(plugin);

  if (importSource) {
    return plugin.file.addImport(importSource, method);
  }

  return toReference(method);
}
