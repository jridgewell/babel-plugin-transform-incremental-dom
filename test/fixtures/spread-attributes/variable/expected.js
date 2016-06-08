var _jsxClosure = function _jsxClosure(func, args) {
  return function jsxClosure() {
    return func.apply(this, args);
  };
};

var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _attr = function _attr(value, name) {
  attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _wrapper = function _wrapper(_props) {
  elementOpenStart("div");

  _forOwn(_props, _attr);

  elementOpenEnd("div");
  return elementClose("div");
};

function render() {
  var test = _jsxWrapper(_jsxClosure(_wrapper, [props]));
}