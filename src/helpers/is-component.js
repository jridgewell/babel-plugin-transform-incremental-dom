// Detects if the given tag represents a component (that is, if it starts with a
// capital letter).
export default function isComponent(tag) {
  return /^[A-Z]/.test(tag);
}
