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
export function generateHoistName(path, fallback = "ref") {
  const parent = path.findParent((p) => {
    return p.isVariableDeclarator() ||
      p.isAssignmentExpression() ||
      p.isCallExpression();
  });

  return path.scope.generateUidIdentifierBasedOnNode(parent && parent.node, fallback)}

// Name Smartly Do Good.
export function generateStaticsName(path) {
  const { scope } = path;
  const name = path.get("name");

  const names = ["statics"];
  let current = name;
  while (!current.isJSXIdentifier()) {
    names.push(current.node.property.name);
    current = current.get("object");
  }
  names.push(current.node.name);

  return scope.generateUidIdentifier(names.reverse().join("$"));
}
