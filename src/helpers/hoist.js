const namespace = "incremental-dom-hoists";

// Sets up the file to hoist all statics
export function setupHoists({ file }) {
  // A map to store helper variable references
  // for each file
  file.set(namespace, []);
}

export function hoist(t, program, { file }) {
  const hoists = file.get(namespace);

  if (hoists.length) {
    const declaration = t.variableDeclaration("const", hoists);
    program.unshiftContainer("body", declaration);
  }
}

export function addHoistedDeclarator(t, scope, name, value, { file }) {
  const ref = scope.generateUidIdentifier(name);
  const declarator = t.variableDeclarator(ref, value);
  file.get(namespace).push(declarator);

  return ref;
}
