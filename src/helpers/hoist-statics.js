import replaceArrow from "./replace-arrow";
import getIdentifier from "./ast/get-identifier";

function hoist(t, path, binding, hoisted, elements) {
  const parent = (binding) ? binding.path.parentPath : path.parentPath;
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
  } else if (binding && binding.constant) {
    // With a key variable, we should update they key's value
    // in the statics array whenever the variable is updated.
    const statement = binding.path.getStatementParent();
    statement.insertAfter(hoisted);
  } else {
    // Some rouge global key variable
    elements.unshift(hoisted);
  }
}

export default function hoistStatics(t, scope, path, staticAttrs, elements) {
  staticAttrs.forEach((attrs) => {
    const declarator = attrs.declarator;
    const { value, index } = attrs.key;
    const declaration = t.variableDeclaration("let", [declarator]);
    const keyVariable = getIdentifier(t, value);
    const binding = keyVariable && scope.getBinding(keyVariable.name);

    if (keyVariable) {
      let hoisted;

      if (index === -1) {
        // If there's no key index, that means we're eagerly evaluating
        // the key variable. If that's true, we need to eagerly evaluate
        // the declaration, too.
        hoisted = declaration;
      } else {
        // We need to assign the key variable's value to the statics array
        // at `index`.
        hoisted = t.expressionStatement(t.assignmentExpression(
          "=",
          t.memberExpression(declarator.id, t.literal(index), true),
          value
        ));
      }

      hoist(t, path, binding, hoisted, elements);
    }

    // If the statics array does not have a key variable (or we're assigning
    // it's value to index), then we know that we can hoist the statics array
    // to the Program scope.
    if (!keyVariable || index > -1) {
      const programScope = scope.getProgramParent();
      programScope.path.unshiftContainer("body", declaration);
    }
  });
}


