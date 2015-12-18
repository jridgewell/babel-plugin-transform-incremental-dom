var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || child && child instanceof String) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else {
    _forOwn(child, _renderArbitrary);
  }
};

var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  elementOpen("span");
  text("·");
  return elementClose("span");
};

function render() {
  elementOpen("div");
  text("Hello World!");
  text("1521334.3");
  elementOpen("div");
  text("Hiya!");
  elementClose("div");
  elementOpen("div");
  text("First · Second");
  elementClose("div");
  elementOpen("div");

  _renderArbitrary(["First ", _jsxWrapper(_wrapper), " Second"]);

  elementClose("div");
  return elementClose("div");
}