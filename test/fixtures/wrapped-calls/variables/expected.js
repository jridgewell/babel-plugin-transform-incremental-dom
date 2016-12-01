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

var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function renderMessage(i) {
  elementOpen("em");
  text("my message " + i);
  return elementClose("em");
}

function intermediate(i) {
  return renderMessage(i);
}

function render() {
  var a = _jsxWrapper(renderMessage, [1]);
  var b = _jsxWrapper(intermediate, [1]);
  var c = _jsxWrapper(renderMessage2, [1]);

  elementOpen("root");

  _renderArbitrary(a);

  _renderArbitrary(b);

  _renderArbitrary(c);

  return elementClose("root");
}

function renderMessage2(i) {
  elementOpen("em");
  text("my message " + i);
  return elementClose("em");
}