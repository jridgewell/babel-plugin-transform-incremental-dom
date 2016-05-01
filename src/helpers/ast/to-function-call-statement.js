import toFunctionCall from "./to-function-call";
import toStatement from "./to-statement";

// Helper to create a function call statement in AST.
export default function toFunctionCallStatement(functionName, args) {
  return toStatement(toFunctionCall(functionName, args));
}
