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

function render() {
  var test = _jsxWrapper(function (_ref, _ref2, _ref3, _ref4, _ref5, _ref6) {
    elementOpen("div", null, null, "attr", _ref);
    elementOpen("div", null, null, "first", _ref2);

    _renderArbitrary(_ref3);

    elementClose("div");

    _renderArbitrary(_ref4);

    elementOpen("div", null, null, "second", _ref5);

    _renderArbitrary(_ref6);

    elementClose("div");
    return elementClose("div");
  }, [i++, i++, i++, i++, i++, i++]);
  elementOpen("root");

  _renderArbitrary(test);

  return elementClose("root");
}