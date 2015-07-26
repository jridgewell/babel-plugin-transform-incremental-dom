const nonWhitespace = /\S/;
const newlines = /\r\n?|\n/;

// Trims the whitespace off the lines.
function lineFilter(lines, line, i, { length }) {
  if (i > 0) { line = line.trimLeft(); }
  if (i + 1 < length) { line = line.trimRight(); }
  if (line) { lines.push(line); }

  return lines;
}

// Cleans the whitespace from a text node.
function cleanText(node) {
  if (!nonWhitespace.test(node.value)) {
    return "";
  }

  let lines = node.value.split(newlines);
  lines = lines.reduce(lineFilter, []);

  return lines.join(" ");
}

// Helper to transform an expression into an expression statement.
function toStatement(t, expression) {
  if (!t.isStatement(expression)) {
    return t.expressionStatement(expression);
  }
  return expression;
}

// Helper to create a function call statement in AST.
function toFunctionCallStatement(t, functionName, args) {
  return t.expressionStatement(toFunctionCall(t, functionName, args));
}


// Helper to create a function call in AST.
export function toFunctionCall(t, functionName, args) {
  return t.callExpression(t.identifier(functionName), args);
}

// Helper to transform a JSX identifier into a normal reference.
export function toReference(t, node, identifier) {
  if (t.isIdentifier(node)) {
    return node;
  }
  if (t.isJSXIdentifier(node)) {
    return identifier ? t.identifier(node.name) : t.literal(node.name);
  }
  return t.memberExpression(
    toReference(t, node.object, true),
    toReference(t, node.property, true)
  );
}


// Extracts attributes into the appropriate
// attribute array. Static attributes and the key
// are placed into static attributes, and expressions
// are placed into the variadic attributes.
export function extractOpenArguments(t, attributes) {
  let key = null;
  let statics = [];
  let attrs = [];
  let hasSpread = false;

  for (let attribute of attributes) {
    if (t.isJSXSpreadAttribute(attribute)) {
      hasSpread = true;
      attrs.push(attribute);
      continue;
    }

    let name = attribute.name.name;
    let attr = t.literal(name);
    let value = attribute.value;

    if (!value) {
      value = t.literal(true);
    } else if (t.isJSXExpressionContainer(value)) {
      value = value.expression;
    }

    if (name === "key") {
      key = value;
    }

    if (name === "key" || t.isLiteral(value)) {
      statics.push(attr, value);
    } else {
      attrs.push([ attr, value ]);
    }
  }

  if (!statics.length) { statics = null; }
  if (!attrs.length) { attrs = null; }

  return { key, statics, attrs, hasSpread };
}

// Transforms an attribute array into sequential attr calls.
export function attrsToAttrCalls(t, scope, attrs) {
  return attrs.map((attr) => {
    if (t.isJSXSpreadAttribute(attr)) {
      let iterator = scope.generateUidIdentifier("attr");

      return t.forInStatement(
        t.variableDeclaration("var", [iterator]),
        attr.argument,
        toFunctionCallStatement(t, "attr", [
          iterator,
          t.memberExpression(attr.argument, iterator, true)
        ])
      );
    }

    return toFunctionCall(t, "attr", attr);
  });
}

// Filters out empty children, and transform JSX expressions
// into normal expressions.
export function buildChildren(t, children) {
  return children.reduce((children, child) => {
    if (t.isJSXExpressionContainer(child)) {
      child = child.expression;
    }

    if (t.isLiteral(child) && typeof child.value === "string") {
      let text = cleanText(child);
      if (!text) { return children; }

      child = toFunctionCall(t, "text", [t.literal(text)]);
    }

    if (t.isJSXEmptyExpression(child)) {
      return children;
    } else if (t.isArrayExpression(child)) {
      child = t.sequenceExpression(buildChildren(t, child.elements));
    } else if (t.isIdentifier(child) || t.isMemberExpression(child)) {
      child = toReference(t, child);
    }

    children.push(child);
    return children;
  }, []);
}

// Helper to flatten out sequence expressions into a top level
// expression statements.
export function flattenExpressions(t, expressions) {
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
