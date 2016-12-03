import { addHoistedDeclarator, generateStaticsName } from "./hoist";
import * as t from "babel-types";

// Hoists the static attributes array, so that the array instance is not
// recreated multiple times.
export default function addStaticHoist(path, plugin, statics, keyIndex) {
  const id = generateStaticsName(path);
  addHoistedDeclarator(path.scope, id, statics, plugin);

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
