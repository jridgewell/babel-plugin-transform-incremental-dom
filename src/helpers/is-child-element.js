// Detects if this element is not a child of another JSX element
export default function isChildElement(path) {
  let isChild = false;
  path.findParent((path) => {
    if (path.isJSXElement()) {
      isChild = true;
      return true;
    }
    return !path.isJSXExpressionContainer();
  });

  return isChild;
}

