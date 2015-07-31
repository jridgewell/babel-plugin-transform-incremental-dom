import toStatement from "./ast/to-statement";

// Helper to flatten out sequence expressions into a top level
// expression statements.
export default function flattenExpressions(t, expressions) {
  return expressions.reduce((nodes, node) => {
    if (t.isSequenceExpression(node)) {
      let expressions = flattenExpressions(t, node.expressions);
      nodes.push(...expressions);
    } else {
      nodes.push(toStatement(t, node));
    }
    return nodes;
  }, []);
}
