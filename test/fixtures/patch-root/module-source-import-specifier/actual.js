import { patch } from "idom-wrapper";

const todoItems = items.map(x => <li>x.text</li>);

patch(container, () => {
  return <div>{todoItems}</div>;
});
