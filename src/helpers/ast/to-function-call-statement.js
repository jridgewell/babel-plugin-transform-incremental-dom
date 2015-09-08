import toFunctionCall from "./to-function-call";
import toStatement from "./to-statement";

// Helper to create a function call statement in AST.
export default function toFunctionCallStatement(t, functionName, args) {
  return toStatement(t, toFunctionCall(t, functionName, args));
}
