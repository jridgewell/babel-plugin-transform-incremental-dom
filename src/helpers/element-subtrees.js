// Detects if this element is not a child of another JSX element
export function isChildElement(path) {
  let isChild = false;

  // It is only a child if it's immediate parent is a JSX element,
  // or it is an ExpressionContainer who's parent is.
  path.findParent((path) => {
    if (path.isJSXElement()) {
      isChild = true;
      return true;
    }
    return !path.isJSXExpressionContainer();
  });

  return isChild;
}

// Determines if path is a inside the subtree
export function isRootSubtree(path, root, { allowRootSubtree }) {
  // The root is part of its own subtree,
  // like how a set is a subset of itself.
  if (path === root) {
    return true;
  }

  if (!allowRootSubtree) {
    return false;
  }

  let isChild = false;
  // Find out if path is contained in the root element.
  path.findParent((parent) => {
    if (parent === root) {
      isChild = true;
    }
    return isChild;
  });

  return isChild;
}
