// Detects if this element is not a child of another JSX element
export default function isChildElement(path) {
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

