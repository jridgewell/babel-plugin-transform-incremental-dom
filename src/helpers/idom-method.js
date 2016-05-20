export default function iDOMMethod(method, { opts, file }) {
  const prefix = opts.prefix || "";
  if (prefix) {
    return `${prefix}.${method}`;
  }

  const binding = file.scope.getBinding(method);
  if (binding) {
    return binding.identifier;
  }

  return method;
}
