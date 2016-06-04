var _wrapper = function _wrapper(_ref) {
  return elementVoid("div", null, null, "attr", _ref);
};

function render() {
  var div = iDOM.jsxWrapper(_wrapper, [i++]);
  return elementVoid("div");
}