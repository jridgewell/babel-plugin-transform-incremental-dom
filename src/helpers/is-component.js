// Detects if the given tag represents a component (that is, if it starts with a
// capital letter).
export default function isComponent(node, { opts }) {
  return opts.components && /^[A-Z]/.test(node.name.name);
}
