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
  if (t.isConditionalExpression(expression)) {
    expression = t.toIfStatement(expression);
  } else if (!t.isStatement(expression)) {
    return t.expressionStatement(expression);
  }
  return expression;
}

// Helper to create a function call statement in AST.
function toFunctionCallStatement(t, functionName, args) {
  return t.expressionStatement(toFunctionCall(t, functionName, args));
}

// Helper to determine if a value is a string in AST.
function isTextual(t, value) {
  let type = t.unaryExpression('typeof', value);
  return t.binaryExpression(
    "||",
    t.binaryExpression("===", type, t.literal('number')),
    t.binaryExpression(
      "||",
      t.binaryExpression("===", type, t.literal('string')),
      t.binaryExpression(
        "&&",
        value,
        t.binaryExpression("instanceof", value, t.identifier('String'))
      )
    )
  );
}

function isDOMWrapper(t, value) {
  var type = t.unaryExpression("typeof", value);
  return t.binaryExpression(
    "&&",
    t.binaryExpression("===", type, t.literal("function")),
    t.memberExpression(
      value,
      t.identifier("__jsxDOMWrapper")
    )
  );
}

// Helper function to render an arbitrary identifier.
// For now, limited to just strings, though this will
// be expanded.
function renderArbitrary(t, scope, child) {
  let ref = toReference(t, child);
  let memoised = scope.maybeGenerateMemoised(ref, true) || ref;

  let ifStatement = t.IfStatement(
    isTextual(t, memoised),
    toFunctionCallStatement(t, "text", [memoised]),
    t.ifStatement(
      isDOMWrapper(t, memoised),
      toStatement(t, t.callExpression(memoised, []))
    )
  );

  if (memoised === ref) {
    return ifStatement;
  } else {
    return t.sequenceExpression([
      t.variableDeclaration("var", [
        t.variableDeclarator(memoised, ref)
      ]),
      ifStatement
    ]);
  }
}

// Helper to create a function call in AST.
export function toFunctionCall(t, functionName, args) {
  return t.callExpression(t.identifier(functionName), args);
}

// Helper to transform a JSX identifier into a normal reference.
export function toReference(t, node) {
  if (t.isJSXIdentifier(node)) {
    return t.literal(node.name);
  }
  if (t.isJSXMemberExpression(node)) {
    return t.toMemberExpression(node);
  }
  return node;
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
export function buildChildren(t, scope, children) {
  return children.reduce((children, child) => {
    const wasExpressionContainer = t.isJSXExpressionContainer(child);
    if (wasExpressionContainer) {
      child = child.expression;
    }

    if (t.isJSXEmptyExpression(child)) { return children; }

    if (t.isLiteral(child) && typeof child.value === "string") {
      let text = cleanText(child);
      if (!text) { return children; }

      child = toFunctionCall(t, "text", [t.literal(text)]);
    } else if (t.isArrayExpression(child)) {
      child = t.sequenceExpression(buildChildren(t, scope, child.elements));
    } else if (wasExpressionContainer && t.isExpression(child)) {
      child = renderArbitrary(t, scope, child);
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
