import { addHoistedDeclarator } from "./hoist";

export default function addStaticHoist(t, scope, plugin, statics, key, keyIndex) {
  const id = addHoistedDeclarator(t, scope, "statics", statics, plugin);
  let staticAssignment = null;

  if (keyIndex > -1) {
    // We need to assign the key variable's value to the statics array at `index`.
    staticAssignment = t.expressionStatement(t.assignmentExpression(
      "=",
      t.memberExpression(id, t.numericLiteral(keyIndex), true),
      key
    ));
  }

  return { id, staticAssignment };
}
