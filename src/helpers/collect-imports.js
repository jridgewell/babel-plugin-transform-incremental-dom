import * as t from "@babel/types";

const importDeclarationFinder = {
  ImportDeclaration(path) {
    const {specifiers, source} = path.node;
    const src = source.value;

    let imports = this.imports.find((imports) => imports.source === src);
    if (!imports) {
      imports = {
        source: src,
        imported: [],
        specifiers: [],
      };
      this.imports.push(imports);
    }

    for (let i = 0; i < specifiers.length; i++) {
      const specifier = specifiers[i];
      const local = specifier.local.name;
      if (t.isImportDefaultSpecifier(specifier)) {
        imports.imported.push("default");
        imports.specifiers.push({ kind: "named", imported: "default", local });
      } else if (t.isImportNamespaceSpecifier(specifier)) {
        imports.imported.push("*");
        imports.specifiers.push({ kind: "namespace", local });
      } else {
        const imported = specifier.imported.name;
        imports.imported.push(imported);
        imports.specifiers.push({ kind: "named", imported, local });
      }
    }
  },

  ExpressionStatement(path) {
    path.skip();
  },
};

// Gathers the import statements in this file.
export default function collectImports(program) {
  const imports = [];
  program.traverse(importDeclarationFinder, { imports })

  return imports;
}
