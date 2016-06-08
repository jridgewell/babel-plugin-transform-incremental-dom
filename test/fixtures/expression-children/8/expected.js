var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _wrapper = _jsxWrapper(function () {
  elementOpen("div");
  text("will be wrapped");
  return elementClose("div");
});

function render() {
  var assignment;
  assignment = _wrapper;
}