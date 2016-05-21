var iDOM = require("incremental-dom");

function render() {
  iDOM.elementOpen("div");
  iDOM.text("test");
  return iDOM.elementClose("div");
}
