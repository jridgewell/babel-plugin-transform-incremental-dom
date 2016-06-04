import isRootJSX from "./is-root-jsx";

// It is only a child if it is a descendant of a JSX element but not a
// JSX Attribute.
function descendant(path) {
  let isChild = false;

  const direct = directChild(path);
  if (direct) {
    return direct;
  }

  path.findParent((path) => {
    if (path.isJSXAttribute()) {
      // Stop traversing, we are not a child.
      return true;
    }

    if (path.isJSXElement()) {
      if (!directChild(path)) {
        // This element is the top of a tree of JSX elements
        // If it's the root tree, we are a child.
        isChild = isRootJSX(path);
        return true;
      }
    }
  });

  if (!isChild) {
    return null;
  }

  return path.findParent((path) => {
    return !path.parentPath || path.parentPath.isJSX();
  });
}

// It is only a child if it's immediate parent is a JSX element,
// or it is an ExpressionContainer who's parent is.
function directChild(path) {
  let isChild = false;
  let child = path;
  let hadNonJSX = false;

  path.findParent((path) => {
    if (path.isJSXElement()) {
      isChild = true;
      return true;
    }

    if (path.isJSXExpressionContainer()) {
      // Defer to what the parent is.
      if (!hadNonJSX) {
        return false;
      }
      // We've crossed over a non-JSX node. For now, we're only optimizing
      // expressions that are similar to if-then logic.
      const expression = path.get("expression");
      return !(expression.isConditionalExpression() || expression.isLogicalExpression());
    }

    if (path.isJSXAttribute() || path.isFunction()) {
      return true;
    }

    hadNonJSX = true;
    child = path;
  });

  return isChild ? child : null;
}

// Detects if this element is not a child of another JSX element
export default function childAncestor(path, { opts }) {
  return (opts.fastRoot ? descendant : directChild)(path);
}
