import { patch } from "incremental-dom";

function render(items) {
  return <div>
  {items.map(x => <li>x.text</li>)}
  </div>;
}

patch(container, render, items);
