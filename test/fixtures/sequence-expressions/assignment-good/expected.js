var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function fn() {
  var a;
  var b = (a = _jsxWrapper(function () {
    return elementVoid("div");
  }), 1);
}