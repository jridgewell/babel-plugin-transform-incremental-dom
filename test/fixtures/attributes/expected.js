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

function render() {
  elementOpen("root");
  elementOpen("div", null, ["class", "my-class"]);
  elementClose("div");
  elementOpen("div", null, ["class", "my-class"]);
  elementClose("div");
  elementOpen("div", null, null, "class", myClass);
  elementClose("div");
  elementOpen("div", null, null, "class", props.myClass);
  elementClose("div");
  elementOpen("div", null, null, "prop", x ? _jsxWrapper(function () {
    return elementVoid("span");
  }) : _jsxWrapper(function () {
    return elementVoid("span");
  }));
  elementClose("div");
  elementOpen("div", null, null, "prop", _jsxWrapper(function (_ref) {
    return elementVoid("span", null, null, "attr", _ref);
  }, [i++]));
  elementClose("div");
  elementOpen("div", null, null, "prop", _jsxWrapper(function (_ref2) {
    elementOpen("span");

    _renderArbitrary(_ref2);

    return elementClose("span");
  }, [i++]));
  elementClose("div");
  return elementClose("root");
}