let prefix;

export function setPrefix(options) {
  prefix = (options && 'prefix' in options) ? options.prefix : '';
};

export default function iDOMMethod(method) {
  return prefix ? `${prefix}.${method}` : method;
};
