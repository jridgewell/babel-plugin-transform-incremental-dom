export default function iDOMMethod(method, plugin) {
  const prefix = plugin.opts.prefix || "";
  return prefix ? `${prefix}.${method}` : method;
}
