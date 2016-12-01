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

var _wrapper = function _wrapper(_deferred, _args, _deferred2, _args2, _deferred3, _args3) {
  elementOpen("div");

  _renderArbitrary(_deferred.apply(_args[0], _args[1]));

  _renderArbitrary(_deferred2.apply(_args2[0], _args2[1]));

  _renderArbitrary(_deferred3.apply(_args3[0], _args3[1]));

  return elementClose("div");
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function render() {
  function fn() {}
  var div = _jsxWrapper(_wrapper, [fn, [undefined, _toConsumableArray(args)], fn, [undefined, [1].concat(_toConsumableArray(args))], fn.test, [fn, _toConsumableArray(args)]]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}