// Filters out empty children, and transform JSX expressions
// into function calls.
export default function filterEagerDeclarators(t, elements, eagerDeclarators) {
  return elements.filter((element) => {
    if (t.isVariableDeclaration(element)) {
      eagerDeclarators.push(...element.declarations);
      return false;
    } else {
      return true;
    }
  });
}

