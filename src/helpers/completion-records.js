import useFastRoot, { fastRootAncestor } from "./fast-root";
import last from "./last";

const map = new WeakMap();

export function getCompletionRecords(path, find = null) {
  const stack = [path];
  let i = 0;
  while (i < stack.length) {
    const p = stack[i];
    if (p.isSequenceExpression()) {
      stack[i] = last(p.get("expressions"));
    } else if (p.isConditionalExpression()) {
      stack[i] = p.get("consequent");
      stack.push(p.get("alternate"));
    } else if (p.isLogicalExpression()) {
      if (!find || p.node.operator === "||") {
        stack.push(p.get("left"));
      }
      stack[i] = p.get("right");
    } else if (find && p === find) {
      return true;
    } else {
      i++;
    }
  }

  return find ? false : stack;
}

// Determines if the element is a completion record.
export function isCompletionRecord(path, { fastRoots, opts }) {
  let is;

  if (useFastRoot(path, opts) && fastRootAncestor(path, fastRoots)) {
    is = true;
  } else {
    const container = path.findParent(p => p.isJSX());

    if (!container || container.isJSXElement()) {
      is = true;
    } else if (container.isJSXAttribute() || container.parentPath.isJSXAttribute()) {
      is = false;
    } else {
      is = getCompletionRecords(container.get("expression"), path);
    }
  }

  map.set(path, is);
  return is;
}
