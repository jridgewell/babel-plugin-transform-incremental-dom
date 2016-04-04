const nonWhitespace = /\S/;
const whitespace = /\s+/g;

// Cleans the whitespace from a text node.
export default function cleanText(value) {
  if (!nonWhitespace.test(value)) {
    return "";
  }

  return value.replace(whitespace, " ");
}
