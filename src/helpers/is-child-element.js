import isRootJSX from "./is-root-jsx";

// It is only a child if it is a descendant of a JSX element but not a
// JSX Attribute.
function descendant(path) {
  let isChild = false;

  path.findParent((path) => {
    if (path.isJSXAttribute()) {
      // Stop traversing, we are not a child.
      return true;
    }
    if (path.isJSXElement()) {
      if (directChild(path)) {
        return false;
      }
      // This element is the top of a tree of JSX elements
      // If it's the root tree, we are a child.
      isChild = isRootJSX(path);
      return true;
    }
  });

  return isChild;
}

// It is only a child if it's immediate parent is a JSX element,
// or it is an ExpressionContainer who's parent is.
function directChild(path) {
  let isChild = false;

  path.findParent((path) => {
    if (path.isJSXElement()) {
      isChild = true;
      return true;
    }
    if (path.isJSXExpressionContainer()) {
      // Defer to what the parent is.
      return false;
    }
    return true;
  });

  return isChild;
}

// Detects if this element is not a child of another JSX element
export default function isChildElement(path, { opts }) {
  return directChild(path) || (opts.fastRoot && descendant(path));
}

