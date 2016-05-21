import toReference from "./ast/to-reference";

// Returns a reference to an iDOM method.
export default function iDOMMethod(method, { opts, file }) {
  const prefix = opts.prefix || "";
  if (prefix) {
    return toReference(`${prefix}.${method}`);
  }

  const binding = file.scope.getBinding(method);
  if (binding) {
    return binding.identifier;
  }

  return toReference(method);
}
