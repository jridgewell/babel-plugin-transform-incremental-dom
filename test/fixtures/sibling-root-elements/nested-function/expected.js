var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _wrapper = _jsxWrapper(function () {
  return elementVoid("div");
}),
    _wrapper2 = _jsxWrapper(function () {
  elementOpen("div");
  return elementClose("div");
});

function render() {
  function fn1() {
    return _wrapper;
  }
  function fn2() {
    return _wrapper2;
  }
  elementOpen("root");
  return elementClose("root");
}