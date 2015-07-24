const nonWhitespace = /\S/;
const newlines = /\r\n?|\n/;
const whitespaceTimmer = /^\s+|\s+$/g;

// Trims the whitespace off the lines.
function lineFilter(lines, line) {
  line = line.replace(whitespaceTimmer, "");

  if (line) { lines.push(line); }

  return lines;
}

// Cleans the whitespace from a text node.
function cleanText({ value }) {
  if (nonWhitespace.test(value)) {
    let lines = value.split(newlines);

    lines = lines.reduce(lineFilter, []);

    return lines.join(" ");
  }
}

export default function(t) {

  // Helper to create a function call in AST.
  function toFunctionCall(functionName, args) {
    return t.callExpression(t.identifier(functionName), args)
  }

  // Helper to create a function call statement in AST.
  function toFunctionCallStatement(functionName, args) {
    return t.expressionStatement(toFunctionCall(functionName, args));
  }

  // Helper to transform a JSX identifier into a normal reference.
  function toReference(node, identifier) {
    if (t.isJSXIdentifier(node)) {
      return identifier ? t.identifier(node.name) : t.literal(node.name);
    }
    return t.memberExpression(
      toReference(node.object, true),
      toReference(node.property, true)
    );
  }

  // Filters out empty children, and transform JSX expressions
  // into normal expressions.
  function childFilter(children, child) {
    if (t.isJSXExpressionContainer(child)) {
      child = child.expression;
    }

    if (t.isJSXEmptyExpression(child)) {
      return children;
    } else if (t.isLiteral(child) && typeof child.value === "string") {
      let text = cleanText(child);
      if (!text) { return children; }

      child = toFunctionCallStatement("text", [t.literal(text)]);
    }

    children.push(child);
    return children;
  }

  // Helper to transform a call expression into an expression statement.
  function callToStatement(expression) {
    if (t.isCallExpression(expression)) {
      return t.expressionStatement(expression);
    }
    return expression;
  }

  // Helper to flatten out sequence expressions into a top level
  // expression statements.
  function sequenceReducer(nodes, node) {
    if (t.isSequenceExpression(node)) {
      let expressions = node.expressions.map(callToStatement);
      nodes.push(...expressions);
    } else {
      nodes.push(callToStatement(node));
    }
    return nodes;
  }

  return {
    buildChildren(children) {
      return children.reduce(childFilter, []);
    },

    // Extracts attributes into the appropriate
    // attribute array. Static attributes and the key
    // are placed into static attributes, and expressions
    // are placed into the variadic attributes.
    extractOpenArguments(attributes) {
      let key = null;
      let statics = [];
      let attrs = [];
      let hasSpread = false;

      for (let attribute of attributes) {
        if (t.isJSXSpreadAttribute(attribute)) {
          hasSpread = true;
          attrs.push(attribute);
        } else {
          let name = attribute.name.name;
          let attr = t.literal(name);
          let value = attribute.value;

          if (t.isLiteral(value)) {
            statics.push(attr, value)
          } else if (value) {
            value = value.expression;

            if (name === "key" || t.isLiteral(value)) {
              statics.push(attr, value);
            } else {
              attrs.push([ attr, value ]);
            }
          } else {
            statics.push(attr, t.literal(true));
          }

          if (name === "key") {
            key = value;
          }
        }
      }

      if (!statics.length) { statics = null; }
      if (!attrs.length) { attrs = null; }

      return { key, statics, attrs, hasSpread };
    },

    flattenExpressions(expressions) {
      return expressions.reduce(sequenceReducer, []);
    },

    // Transforms an attribute array into sequential attr calls.
    attrsToAttrCalls(scope) {
      return function(attr) {
        if (t.isJSXSpreadAttribute(attr)) {
          let iterator = scope.generateUidIdentifier("attr");

          return t.forInStatement(
            t.variableDeclaration("var", [iterator]),
            attr.argument,
            toFunctionCallStatement("attr", [
              iterator,
              t.memberExpression(attr.argument, iterator, true)
            ])
          );
        } else {
          return toFunctionCall("attr", attr);
        }
      }
    },

    toFunctionCall: toFunctionCall,

    toFunctionCallStatement: toFunctionCallStatement,

    toReference: toReference
  };
};
