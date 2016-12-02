var _iDOM = require("iDOM");

var _div = function _div(_ref) {
  return elementVoid("div", null, null, "attr", _ref);
};

function render() {
  var div = (0, _iDOM.jsxWrapper)(_div, [i++]);
  return elementVoid("div");
}