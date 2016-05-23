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

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "attr", i++);

  _renderArbitrary([1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i) {
      elementOpen("map");

      _renderArbitrary(_i);

      return elementClose("map");
    }, [i]);
  }));

  _renderArbitrary(function () {
    _jsxWrapper(function (_ref, _ref2) {
      elementOpen("div", null, null, "first", _ref);

      _renderArbitrary(_ref2);

      return elementClose("div");
    }, [i++, i++]);
  }());

  _renderArbitrary(i++);

  elementOpen("div", null, null, "second", i++);

  _renderArbitrary(i++);

  elementClose("div");
  elementClose("div");
  return elementClose("root");
}