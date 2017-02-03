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

function ancestry(ancestor, fastRoot) {
  let path = ancestor;

  let last;
  while ((last = ancestor, ancestor = ancestor.parentPath)) {
    // We've found our path to a parent.
    if (ancestor.isJSXElement()) {
      return path;
    }

    // JSX Attributes may never extend the search path.
    if (ancestor.isJSXAttribute()) {
      return;
    }

    // We're interested in the expression container's child, not the expression
    // container itself.
    if (ancestor.isJSXExpressionContainer()) {
      continue;
    }

    if (ancestor.isSequenceExpression()) {
      const expressions = ancestor.get("expressions");
      // If we didn't traverse up from the last expression, we're not really
      // a child.
      if (expressions[expressions.length - 1] !== last) {
        return;
      }

      // Sequence Expressions extend the search only when the direct child is the expression.
      // Ie, we can't extend the search if we've already stopped due to some
      // conditional or logical expression.
      if (last !== path) {
        continue;
      }
    } else if (ancestor.isConditionalExpression()) {
      if (last.key !== "test") {
        continue;
      }

      return;
    } else if (ancestor.isLogicalExpression()) {
      if (last.key === "right" || ancestor.node.operator === "||") {
        // These expressions "extend" the search, but they do not count as direct children.
        // That's because the expression could resolve to something other than a JSX element.
        continue;
      }

      return;
    } else if (!fastRoot) {
      // In normal mode, nothing else keeps a JSX search going.
      return;
    }

    // Record this path as the topmost child so far.
    path = ancestor;
  }
}

// Detects if this element is a child of another JSX element,
// returning the topmost child expression in the path to get there.
export default function ancestorExpression(path, { opts }) {
  if (map.has(path)) {
    return map.get(path);
  }

  const ancestor = ancestry(path, useFastRoot(path, opts));
  map.set(path, ancestor);
  return ancestor;
}
