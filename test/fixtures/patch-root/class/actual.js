import { patch } from "incremental-dom";

class Component {
  template(data) {
    return <div>
    {items.map(x => <li>x.text</li>)}
    </div>;
  }

  render() {
    patch(this.element, this.template, this.data);
  }
}
