import get from "./get";

export default function iDOMMethod(file, method) {
  const prefix = get(file, ['opts', 'extra', 'incremental-dom', 'prefix']) || "";
  return prefix ? `${prefix}.${method}` : method;
};
