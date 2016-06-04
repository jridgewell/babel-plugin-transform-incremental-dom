var _iDOM = require("iDOM");

function render() {
  elementOpenStart("div");
  (0, _iDOM.spreadAttribute)(props);
  elementOpenEnd("div");
  return elementClose("div");
}