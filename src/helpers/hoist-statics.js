import { addHoistedDeclarator } from "./hoist";

// Hoists the static attributes array, so that the array instance is not
// recreated multiple times.
export default function addStaticHoist(t, scope, plugin, statics, key, keyIndex) {
  const id = addHoistedDeclarator(t, scope, "statics", statics, plugin);

  if (keyIndex === -1) {
    return id;
  } else {
    // We need to assign the key variable's value to the statics array at `index`.
    return t.sequenceExpression([
      t.assignmentExpression(
        "=",
        t.memberExpression(id, t.numericLiteral(keyIndex), true),
        key
      ),
      id
    ]);
  }
}
