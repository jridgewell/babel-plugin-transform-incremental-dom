import { patch } from "incremental-dom";

const todoItems = function(items) {
  // @incremental-dom enable-fastRoot
  return items.map(x => <li>x.text</li>);
}

patch(container, () => {
  return <div>{todoItems(items)}</div>;
});
