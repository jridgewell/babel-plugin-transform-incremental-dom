var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _statics = ["id", "id", "key", ""],
    _wrapper = function _wrapper(_i) {
  return elementVoid("div", _i, (_statics[3] = _i, _statics));
};

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(_jsxWrapper(_wrapper, [i]));
  }
  return els;
}