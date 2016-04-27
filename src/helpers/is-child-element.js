import LimitedMap from "./map";

const childMap = new LimitedMap(25);

// Detects if this element is not a child of another JSX element
export default function isChildElement(path) {
  if (childMap.has(path)) {
    return childMap.get(path);
  }

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

  childMap.set(path, isChild);
  return isChild;
}

