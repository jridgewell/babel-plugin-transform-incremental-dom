import { patch } from "incremental-dom";

const todoItems = items.map(x => <li>x.text</li>);

patch(container, () => {
  return <div>{todoItems}</div>;
});
