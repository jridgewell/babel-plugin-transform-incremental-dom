import toReference from "./to-reference";
import * as t from "@babel/types";

// Helper to create a function call in AST.
export default function toFunctionCall(functionName, args) {
  return t.callExpression(toReference(functionName), args);
}
