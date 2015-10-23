import isRootJSX from "./helpers/find-other-jsx";
import transformer from "./helpers/transformer";

export default function ({ Plugin, types: t }) {
  return new Plugin("incremental-dom", { visitor : {
    JSXElement: function(node) {
      if (isRootJSX(this)) {
        this.traverse(transformer);
      }
    },

    JSXNamespacedName() {
      throw this.errorWithNode("JSX Namespaces aren't supported.");
    }
  }});
}
