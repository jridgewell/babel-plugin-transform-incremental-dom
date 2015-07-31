const nonWhitespace = /\S/;
const newlines = /\r\n?|\n/;

// Trims the whitespace off the line.
function lineFilter(lines, line, i, { length }) {
  if (i > 0) { line = line.trimLeft(); }
  if (i + 1 < length) { line = line.trimRight(); }
  if (line) { lines.push(line); }

  return lines;
}

// Cleans the whitespace from a text node.
export default function cleanText(value) {
  if (!nonWhitespace.test(value)) {
    return "";
  }

  let lines = value.split(newlines);
  lines = lines.reduce(lineFilter, []);

  return lines.join(" ");
}
