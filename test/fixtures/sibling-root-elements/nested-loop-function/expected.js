var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  return elementVoid("div");
};

function fn4() {
  var items = items.map(function (item) {
    return _jsxWrapper(_wrapper);
  });
  return elementVoid("root");
}