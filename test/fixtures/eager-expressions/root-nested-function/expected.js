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

var _wrapper = function _wrapper(_i) {
  elementOpen("map");

  _renderArbitrary(_i);

  return elementClose("map");
},
    _wrapper2 = function _wrapper2(_ref, _ref2) {
  elementOpen("div", null, null, "first", _ref);

  _renderArbitrary(_ref2);

  return elementClose("div");
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "attr", i++);

  _renderArbitrary([1, 2, 3].map(function (i) {
    return _jsxWrapper(_jsxClosure(_wrapper, [i]));
  }));

  _renderArbitrary(function () {
    _jsxWrapper(_jsxClosure(_wrapper2, [i++, i++]));
  }());

  _renderArbitrary(i++);

  elementOpen("div", null, null, "second", i++);

  _renderArbitrary(i++);

  elementClose("div");
  elementClose("div");
  return elementClose("root");
}