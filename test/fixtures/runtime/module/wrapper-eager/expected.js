var _iDOM = require("iDOM");

var _div$wrapper = function _div$wrapper(_attr) {
  return elementVoid("div", null, null, "attr", _attr);
};

function render() {
  var div = (0, _iDOM.jsxWrapper)(_div$wrapper, [i++]);
  return elementVoid("div");
}