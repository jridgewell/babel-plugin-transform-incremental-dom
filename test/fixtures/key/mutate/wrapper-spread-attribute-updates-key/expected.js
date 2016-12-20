var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
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
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === "object") {
    if (child.__jsxDOMWrapper) {
      var func = child.func,
          args = child.args;

      if (args) {
        func.apply(this, args);
      } else {
        func();
      }
    } else if (String(child) === "[object Object]") {
      _forOwn(child, _renderArbitrary);
    }
  }
};

var _div$statics = ["key", ""],
    _div$wrapper = function _div$wrapper(_ref, _ref2, _ref3) {
  elementOpen("div", null, null, "attr", _ref);
  elementVoid("div", _ref3, (_div$statics[1] = _ref3, _div$statics), "attr2", _ref2);
  return elementClose("div");
};

function render() {
  var div = _jsxWrapper(_div$wrapper, [i++, i++, i++]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}