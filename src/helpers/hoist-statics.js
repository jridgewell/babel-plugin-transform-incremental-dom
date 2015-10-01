import replaceArrow from "./replace-arrow";

export default function hoistStatics(t, scope, path, staticAttrs, elements, { eager }) {
  staticAttrs.forEach((attrs) => {
    const declaration = t.variableDeclaration("let", [attrs.declarator]);
    const key = attrs.key;
    const identifierKey = t.isIdentifier(key.value);
    const binding = identifierKey && scope.getBinding(key.value.name);

    if (identifierKey) {
      const parent = (binding) ? binding.path.parentPath : path.parentPath;
      let hoisted;

      if (eager) {
        // If we wrap the JSX Element, that means we'll need to eagerly
        // evaluate the key variable. So, we can't lift and assign the key
        // value like normal.
        hoisted = declaration;
      } else {
        // If we're note wrapping, we can assign the key value and hoist
        // the statics array to the top level program.
        hoisted = t.expressionStatement(t.assignmentExpression(
          "=",
          t.memberExpression(attrs.declarator.id, t.literal(key.index), true),
          key.value
        ));
      }

      if (parent.isArrowFunctionExpression()) {
        // The key variable is a formal parameter
        const body = parent.get("body");

        if (path.parentPath === parent) {
          // If the parameter in the parent function, then we need to place the
          // assignment into the iDOM element calls that we replace the arrow
          // function with.
          elements.unshift(hoisted);
        } else if (body.isBlockStatement()) {
          // This one's easy, just push the assignment to the top of the
          // function.
          body.unshiftContainer("body", hoisted);
        } else {
          // And this one's a pain. We have to replace the entire arrow
          // function with the assignment and an explicit return for the
          // implicitly returned expression.
          replaceArrow(t, parent, [ hoisted, t.returnStatement(body.node) ]);
        }
      } else if (parent.isFunction()) {
        // The key variable is a formal parameter
        parent.get("body").unshiftContainer("body", hoisted);
      } else if (binding) {
        // With a key variable, we should update they key's value
        // in the statics array whenever the variable is updated.
        const statement = binding.path.getStatementParent();
        statement.insertAfter(hoisted);
      } else {
        // Some rouge global key variable
        elements.unshift(hoisted);
      }
    }

    // If we're not wrapping the JSX Element, put the statics array into
    // the top level Program scope.
    if (!(binding && eager)) {
      const programScope = scope.getProgramParent();
      programScope.path.unshiftContainer("body", declaration);
    }
  });
}
