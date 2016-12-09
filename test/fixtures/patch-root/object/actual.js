import { patch } from "incremental-dom";

function Component() {
}

Component.prototype.template = function(data) {
  return <div>
  {items.map(x => <li>x.text</li>)}
  </div>;
}

Component.prototype.render = function() {
  patch(this.element, this.template, this.data);
}
