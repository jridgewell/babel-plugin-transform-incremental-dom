var _iDOM = require("iDOM");

function render() {
  elementOpenStart("div");
  (0, _iDOM.forOwn)(props, _iDOM.attr);
  elementOpenEnd("div");
  return elementClose("div");
}