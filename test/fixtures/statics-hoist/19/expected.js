var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _statics = ["id", "id2", "key", ""],
    _statics2 = ["id", "id"],
    _wrapper = function _wrapper(_key) {
  elementOpen("div", null, _statics2);
  elementVoid("div", _key, (_statics[3] = _key, _statics));
  return elementClose("div");
};

function fn8(key4) {
  var a = _jsxWrapper(_wrapper, [key4]);
  return elementVoid("root");
}