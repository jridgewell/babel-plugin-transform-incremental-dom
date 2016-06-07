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
  let last = path;

  while ((path = path.parentPath)) {
    if (path.isJSXElement()) {
      isChild = true;
      break;
    }

    if (path.isJSXExpressionContainer()) {
      // Defer to what the parent is.
      continue;
    }

    if (path.isSequenceExpression()) {
      const expressions = path.get("expressions");
      // If we didn't traverse up from the last expression, we're not really
      // a child.
      if (expressions[expressions.length - 1] !== last) {
        break;
      }

      // Sequence expressions can be considered a child JSX element if the element
      // was the last expression.
      if (last.isJSXElement()) {
        child = path;
      }
    } else if (!(path.isConditionalExpression() || path.isLogicalExpression())) {
      break;
    }

    last = path;
  }

  return isChild ? child : null;
}

function useFastRoot(path, { fastRoot = false }) {
  path.find((path) => {
    const comments = path.node.leadingComments;

    return comments && comments.find((comment) => {
      const match = /@fastRoot\s+(true|false)/.exec(comment.value);

      if (match) {
        fastRoot = match[1] === "true";
        return true;
      }
    });
  });

  return fastRoot;
}

// Detects if this element is not a child of another JSX element
export default function childAncestor(path, { opts }) {
  return (useFastRoot(path, opts) ? descendant : directChild)(path);
}
