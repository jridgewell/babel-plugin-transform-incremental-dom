var _jsxClosure = function _jsxClosure(func, args) {
  return function jsxClosure() {
    return func.apply(this, args);
  };
};

var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _statics = ["id", "id", "key", ""],
    _wrapper = function _wrapper(_i) {
  return elementVoid("div", _i, (_statics[3] = _i, _statics));
};

function fn7(items) {
  items = items.map(function (el, i) {
    return _jsxWrapper(_jsxClosure(_wrapper, [i]));
  });
  return elementVoid("root");
}