const map = new WeakMap();

function useFastRoot(path, { fastRoot = false }) {
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

function ancestorPath(path, useFastRoot) {
  let child = path;
  let last = path;

  while ((last = path, path = path.parentPath)) {
    // We've found our path to a parent.
    if (path.isJSXElement()) {
      return child
    }

    // JSX Attributes may never extend the search path.
    if (path.isJSXAttribute()) {
      return;
    }

    // We're interested in the expression container's child, not the expression
    // container itself.
    if (path.isJSXExpressionContainer()) {
      continue;
    }

    if (path.isSequenceExpression()) {
      const expressions = path.get("expressions");
      // If we didn't traverse up from the last expression, we're not really
      // a child.
      if (expressions[expressions.length - 1] !== last) {
        return;
      }

      // Sequence Expressions extend the search only when the direct child is the expression.
      // Ie, we can't extend the search if we've already stopped due to some
      // conditional or logical expression.
      if (last !== child) {
        continue;
      }
    } else if (path.isConditionalExpression()) {
      if (last.key === 'test') {
        break;
      }

      continue;
    } else if (path.isLogicalExpression()) {
      if (path.get("right") === last || path.node.operator === "||") {
        // These expressions "extend" the search, but they do not count as direct children.
        // That's because the expression could resolve to something other than a JSX element.
        continue;
      }

      break;
    } else if (!useFastRoot) {
      // In normal mode, nothing else keeps a JSX search going.
      return;
    }

    // Record this path as the topmost child so far.
    child = path;
  }
}

// Detects if this element is a child of another JSX element,
// returning the topmost child expression in the path to get there.
export default function childAncestor(path, { opts }) {
  if (map.has(path)) {
    return map.get(path);
  }

  const ancestor = ancestorPath(path, useFastRoot(path, opts));
  map.set(path, ancestor);
  return ancestor;
}
