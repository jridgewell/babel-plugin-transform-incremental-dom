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

var _wrapper = function _wrapper(_deferred, _args) {
  elementOpen("div");

  _renderArbitrary(_deferred(_args));

  return elementClose("div");
};

function render() {
  var div = _jsxWrapper(_wrapper, [(1, 2, fn), i++]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}