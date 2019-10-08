import toStatement from "./to-statement";
import * as t from "@babel/types";

// Helper to flatten out sequence expressions into a top level
// expression statements.
export default function flattenExpressions(expressions, nodes = []) {
  return expressions.reduce((nodes, node) => {
    if (t.isSequenceExpression(node)) {
      return flattenExpressions(node.expressions, nodes);
    }

    nodes.push(toStatement(node));
    return nodes;
  }, nodes);
}
