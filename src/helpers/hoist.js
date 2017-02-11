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
export function addHoistedDeclarator(scope, ref, value, { file }) {
  const declarator = t.variableDeclarator(ref, value);
  file.get(namespace).push(declarator);

  return ref;
}

// Name Smartly Do Good.
export function generateHoistName(path, suffix = "ref") {
  const parent = path.findParent((p) => {
    return p.isVariableDeclarator() ||
      p.isAssignmentExpression() ||
      p.isStatement();
  });

  let name;
  if (parent.isAssignmentExpression()) {
    name = parent.get("left");
  } else if (parent.isVariableDeclarator()) {
    name = parent.get("id");
  } else {
    name = path.get("name");
  }
  return generateHoistNameBasedOn(name, suffix);
}

// Name Smartly Do Good.
function generateHoistNameBasedOn(path, suffix = "") {
  const names = [];
  if (suffix) {
    names.push(suffix);
  }

  let current = path;
  while (!(current.isIdentifier() || current.isJSXIdentifier())) {
    names.push(current.node.property.name);
    current = current.get("object");
  }
  names.push(current.node.name);

  return path.scope.generateUidIdentifier(names.reverse().join("$"));
}
