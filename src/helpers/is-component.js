const componentTester = /^[A-Z]/;

// Detects if the given tag represents a component (that is, if it starts with a
// capital letter).
export default function isComponent(path, { opts }) {
  if (!opts.components || !path.isJSXIdentifier()) {
    return false;
  }

  return componentTester.test(path.node.name);
}
