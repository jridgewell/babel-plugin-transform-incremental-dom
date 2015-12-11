const namespace = "incremental-dom-hoists";

// Sets up the file to hoist all statics
export function setupHoists(program, file) {
  // A map to store helper variable references
  // for each file
  file.set(namespace, []);
}

export function hoistStatics(t, program, file) {
  const hoists = file.get(namespace);

  if (hoists.length) {
    const declaration = t.variableDeclaration("const", hoists);
    program.unshiftContainer("body", declaration);
  }
}

export default function addStaticHoist(t, scope, file, statics, key, keyIndex) {
  const id = scope.generateUidIdentifier("statics");
  const declarator = t.variableDeclarator(id, statics);
  let staticAssignment = null;

  const hoists = file.get(namespace);
  hoists.push(declarator);

  if (keyIndex > -1) {
    // We need to assign the key variable's value to the statics array at `index`.
    staticAssignment = t.expressionStatement(t.assignmentExpression(
      "=",
      t.memberExpression(id, t.numericLiteral(keyIndex), true),
      key
    ));
  }

  return { id, staticAssignment };
}
