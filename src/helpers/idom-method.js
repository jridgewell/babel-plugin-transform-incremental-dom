import getOption from "./get-option";

export default function iDOMMethod(file, method) {
  const prefix = getOption(file, "prefix") || "";
  return prefix ? `${prefix}.${method}` : method;
}
