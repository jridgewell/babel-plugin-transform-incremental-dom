var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _statics = ["id", "id"],
    _wrapper = function _wrapper(_i) {
  return elementVoid("div", _i, _statics, "key", _i);
};

function fn7(items) {
  items = items.map(function (el, i) {
    return _jsxWrapper(_wrapper, [i]);
  });
  return elementVoid("root");
}