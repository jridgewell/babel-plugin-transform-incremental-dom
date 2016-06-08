var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _wrapper = _jsxWrapper(function () {
  return elementVoid("span");
}),
    _wrapper2 = _jsxWrapper(function () {
  return elementVoid("span");
});

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", x ? _wrapper : _wrapper2);
  elementClose("div");
  return elementClose("root");
}