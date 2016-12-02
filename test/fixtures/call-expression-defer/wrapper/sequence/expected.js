var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || type === "object" && child instanceof String) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === "object" && String(child) === "[object Object]") {
    _forOwn(child, _renderArbitrary);
  }
};

var _wrapper = function _wrapper(_deferred, _deferred2, _deferred3, _b, _deferred4, _b2, _deferred5, _b3) {
  elementOpen("div");

  _renderArbitrary(_deferred());

  _renderArbitrary(_deferred2());

  _renderArbitrary(_b == 1 ? _deferred3() : _deferred3());

  _renderArbitrary(_b2 == 0 ? _deferred4 : _deferred4());

  _renderArbitrary(_b3 == 0 ? _deferred5 : _deferred5());

  return elementClose("div");
};

function render() {
  var _b = 0,
      _b2 = 0,
      _b3 = 0;

  function fn() {}
  function fn2() {}
  var div = _jsxWrapper(_wrapper, [(1, 2, fn2), (1, fn(), fn2), true ? (1, 2, (_b = 1, fn2)) : (1, 2, (_b = 2, fn2)), _b, true && (1, fn(), (_b2 = 1, fn2)), _b2, true || (1, fn(), (_b3 = 1, fn2)), _b3]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}