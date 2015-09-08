import toStatement from "./ast/to-statement";

// Helper to flatten out sequence expressions into a top level
// expression statements.
export default function flattenExpressions(t, expressions, nodes = []) {
  return expressions.reduce((nodes, node) => {
    if (t.isSequenceExpression(node)) {
      flattenExpressions(t, node.expressions, nodes);
    } else {
      nodes.push(toStatement(t, node));
    }
    return nodes;
  }, nodes);
}
