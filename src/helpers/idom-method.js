let prefix = process.env.IDOM_PREFIX || '';

export function setPrefix(options = {}) {
  if (options && 'prefix' in options) {
    prefix = options.prefix;
  }
};

export default function iDOMMethod(method) {
  return prefix ? `${prefix}.${method}` : method;
};
