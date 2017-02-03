import { patch } from "incremental-dom";

function todoItems() {
  return items.map(x => <li>x.text</li>);
}

patch(container, () => {todoItems()});
