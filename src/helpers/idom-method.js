import toReference from "./ast/to-reference";
import moduleSource from "./module-source";
import addImport from "./add-import";

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, plugin) {
  const importSource = moduleSource(plugin);

  if (importSource) {
    return addImport(plugin.file, importSource, method);
  }

  return toReference(method);
}
