import { addHoistedDeclarator } from "./hoist";
import * as t from "babel-types";

// Hoists the static attributes array, so that the array instance is not
// recreated multiple times.
export default function addStaticHoist(scope, plugin, statics, keyIndex) {
  const id = addHoistedDeclarator(scope, "statics", statics, plugin);

  if (keyIndex === -1) {
    return id;
  } else {
    const staticAttrs = statics.elements;
    const key = staticAttrs[keyIndex];
    staticAttrs[keyIndex] = t.stringLiteral("");

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
