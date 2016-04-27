// This node is returned if it's parent is explicitly or
// implicitly returned.
export default function isReturned(path) {
  const parent = path.parentPath;
  return parent.isReturnStatement() || parent.isArrowFunctionExpression();
}
