var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _wrapper = _jsxWrapper(function () {
  elementOpen("array");
  text("will be wrapped");
  return elementClose("array");
});

function render() {
  var children = [1, 2, 3, _wrapper];
}