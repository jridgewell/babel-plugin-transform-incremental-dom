import * as t from "@babel/types";

const nonWhitespace = /\S/;
const whitespace = /\s+/g;

// Cleans the whitespace from a text node.
export default function cleanText(jsxText) {
  const text = jsxText.node.value;
  if (!nonWhitespace.test(text)) {
    return "";
  }

  return t.stringLiteral(text.replace(whitespace, " "));
}
