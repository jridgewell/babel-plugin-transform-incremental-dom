var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function render() {
  function fn1() {
    return _jsxWrapper(function () {
      return elementVoid("div");
    });
  }
  function fn2() {
    return _jsxWrapper(function () {
      elementOpen("div");
      return elementClose("div");
    });
  }
  elementOpen("root");
  return elementClose("root");
}