var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function fn4() {
  var items = items.map(function (item) {
    return _jsxWrapper(function () {
      return elementVoid("div");
    });
  });
  return elementVoid("root");
}