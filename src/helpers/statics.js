function declaratorEqual(t, statics, other) {
  const elements = statics.elements;
  const others = other.elements;
  const length = elements.length;

  if (length !== others.length) { return false; }

  for (let i = 0; i < length; i++) {
    const a = elements[i];
    const b = others[i];

    if (a.type !== b.type) {
      return false;
    }
    return t.isIdentifier(a) ? a.name === b.name : a.value === b.value;
  }
}

export default class Statics {
  constructor(t) {
    this.declarators = [];
  }

  addStatic(t, scope, statics) {
    debugger;
    let declarator = this.declarators.find((declarator) => {
      return declaratorEqual(t, statics, declarator.init);
    });

    if (declarator) { return declarator; }

    const ref = scope.generateUidIdentifier("statics");
    declarator = t.variableDeclarator(ref, statics);
    this.declarators.push(declarator);

    return declarator;
  }

  declaration(t) {
    if (this.declarators.length) {
      return t.variableDeclaration("let", this.declarators);
    }
  }
}
