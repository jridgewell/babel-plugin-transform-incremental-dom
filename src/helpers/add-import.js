import * as t from "@babel/types";

const importMap = new WeakMap();

export default function addImport(file, source, imported) {
  let imports = importMap.get(file);
  if (!imports) {
    imports = {};
    importMap.set(file, imports);
  }

  const alias = `${source}:${imported}`;
  if (imports[alias]) {
    return t.cloneNode(imports[alias]);
  }

  const { scope } = file;
  const id = scope.generateUidIdentifier(imported);
  imports[alias] = id;

  const specifier = t.importSpecifier(id, t.identifier(imported));
  const declaration = t.importDeclaration([specifier], t.stringLiteral(source));
  file.path.unshiftContainer("body", declaration);

  return t.cloneNode(id);
}
