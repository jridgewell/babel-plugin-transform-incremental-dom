import { patch } from "incremental-dom";

const obj = {
  get template() {
    return <span>Hello</span>;
  },

  render() {
    patch(this.container, () => {
      return <div>{this.template}</div>;
    });
  }
}
