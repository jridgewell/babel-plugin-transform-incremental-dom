// A stopgap, until babe/babel#2469 is merged
// Replaces the body of an implicit-return arrow
// function with a block statement.
export default function replaceArrow(t, arrowPath, body) {
  const arrow = arrowPath.node;

  return arrowPath.replaceWith(t.arrowFunctionExpression(
    arrow.params,
    body,
    arrow.async
  ));
}
