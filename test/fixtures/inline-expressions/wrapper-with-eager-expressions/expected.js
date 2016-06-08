var _jsxClosure = function _jsxClosure(func, args) {
  return function jsxClosure() {
    return func.apply(this, args);
  };
};

var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
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

var _wrapper = function _wrapper(_attr) {
  return elementVoid("div", null, null, "attr", _attr);
};

function render() {
  var div;
  div = _jsxWrapper(_jsxClosure(_wrapper, [attr]));
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}