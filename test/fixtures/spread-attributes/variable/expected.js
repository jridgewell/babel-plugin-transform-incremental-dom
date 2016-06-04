var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
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
  var test = _jsxWrapper(_wrapper, [props]);
}