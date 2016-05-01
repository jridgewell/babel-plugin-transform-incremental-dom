import * as t from "babel-types";

const namespace = "incremental-dom-hoists";

// Sets up the file to hoist all statics
export function setupHoists({ file }) {
  // A map to store helper variable references
  // for each file
  file.set(namespace, []);
}

export function hoist(program, { file }) {
  const hoists = file.get(namespace);

  if (hoists.length) {
    const declaration = t.variableDeclaration("const", hoists);
    program.unshiftContainer("body", declaration);
  }
}

// Hoists the variable to the top of the file.
export function addHoistedDeclarator(scope, name, value, { file }) {
  const ref = scope.generateUidIdentifier(name);
  const declarator = t.variableDeclarator(ref, value);
  file.get(namespace).push(declarator);

  return ref;
}
