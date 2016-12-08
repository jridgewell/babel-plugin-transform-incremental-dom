import * as iDOM from "idom-wrapper";

const todoItems = items.map(x => <li>x.text</li>);

iDOM.patch(container, () => {
  return <div>{todoItems}</div>;
});
