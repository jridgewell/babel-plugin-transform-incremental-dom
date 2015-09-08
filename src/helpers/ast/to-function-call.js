import toReference from "./to-reference";

// Helper to create a function call in AST.
export default function toFunctionCall(t, functionName, args) {
  return t.callExpression(toReference(t, functionName), args);
}
