import last from "./last";

// Determines if this JSX element has fast-root enabled or disabled.
// Fast root may be explicitly set using inline comments, and defaults
// to the global option value.
export default function useFastRoot(path, { fastRoot = false }) {
  path.find((path) => {
    const comments = path.node.leadingComments;

    return comments && comments.find((comment) => {
      const match = /@incremental-dom.+(enable|disable)-fastRoot/.exec(comment.value);

      if (match) {
        fastRoot = match[1] === "enable";
        return true;
      }
    });
  });

  return fastRoot;
}

// Find the root ancestor element of a fast-root enabled element.
export function fastRootAncestor(path, fastRoots) {
  let ancestor = path;
  let root = path;
  let child = path;

  while ((child = ancestor, ancestor = ancestor.parentPath)) {
    if (ancestor.isJSXElement()) {
      // Found!
      break;
    }

    if (ancestor.isJSXAttribute()) {
      // JSX Attributes can never be roots.
      return false;
    }

    if (ancestor.isJSXExpressionContainer()) {
      // Don't muck up the root. We're interested in the expression, not the
      // container.
      continue;
    }

    if (ancestor.isSequenceExpression()) {
      // If we didn't traverse up from the child expression, we're not really
      // a child.
      if (last(ancestor.get("expressions")) !== child) {
        return false;
      }
    } else if (ancestor.isConditionalExpression()) {
      if (child.key === "test") {
        return false;
      }

      // Break root detection chain. We could extend this to determine if both
      // branches are actually JSX elements (or fast-root containers).
      continue;
    } else if (ancestor.isLogicalExpression()) {
      if (child.key === "left" && ancestor.node.operator === "&&") {
        // Since JSX elements are always truthy, this guarantees the branching
        // will pass this element and continue after the &&.
        return false;
      }

      // Break root detection chain. We could extend this to determine if both
      // branches are actually JSX elements (or fast-root containers).
      continue;
    }

    // If we haven't broken root detection chain yet, update the root.
    if (child === root) {
      root = ancestor;
    }
  }


  if (root) {
    fastRoots.add(root);
  }
  return true;
}
