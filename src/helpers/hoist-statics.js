import replaceArrow from "./replace-arrow";
import eagerlyDeclare from "./eagerly-declare";

export default function hoistStatics(t, scope, path, staticAttrs, elements) {
  staticAttrs.forEach((attrs) => {
    const declarator = attrs.declarator;
    const { value, index } = attrs.key;
    const keyVariable = !t.isLiteral(value) && value;

    if (keyVariable) {
      if (index === -1) {
        // If there's no key index, that means we're eagerly evaluating
        // the key variable. If that's true, we need to eagerly evaluate
        // the declaration, too.
        eagerlyDeclare(t, scope, path, [declarator]);
      } else {
        // We need to assign the key variable's value to the statics array
        // at `index`.
        elements.unshift(t.expressionStatement(t.assignmentExpression(
          "=",
          t.memberExpression(declarator.id, t.literal(index), true),
          value
        )))
      }
    }

    // If the statics array does not have a key variable (or we're assigning
    // it's value to index), then we know that we can hoist the statics array
    // to the Program scope.
    if (!keyVariable || index > -1) {
      const declaration = t.variableDeclaration("let", [declarator]);
      const programScope = scope.getProgramParent();
      programScope.path.unshiftContainer("body", declaration);
    }
  });
}


