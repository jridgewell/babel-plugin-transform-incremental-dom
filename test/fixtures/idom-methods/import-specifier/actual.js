import { elementOpen as eo, elementClose, text } from "incremental-dom";

function scope() {
  var eo = other;
  var elementClose = other;
  function render() {
    return <div>test</div>;
  }
}
