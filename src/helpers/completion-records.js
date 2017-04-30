import useFastRoot, { fastRootAncestor } from "./fast-root";
import last from "./last";

const map = new WeakMap();

// Gets all the possible values an expression may resolve.
export function getCompletionRecords(path, all = true, completions = []) {
  if (path.isSequenceExpression()) {
    getCompletionRecords(last(path.get("expressions")), all, completions);
  } else if (path.isConditionalExpression()) {
    getCompletionRecords(path.get("consequent"), all, completions);
    getCompletionRecords(path.get("alternate"), all, completions);
  } else if (path.isLogicalExpression()) {
    if (all || path.node.operator === "||") {
      getCompletionRecords(path.get("left"), all, completions);
    }
    getCompletionRecords(path.get("right"), all, completions);
  } else {
    completions.push(path);
  }

  return completions;
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
      const completions = getCompletionRecords(container.get("expression"), false);
      is = completions.indexOf(path) > -1;
    }
  }

  map.set(path, is);
  return is;
}
