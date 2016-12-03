var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _flipAttr = function _flipAttr(value, name) {
  attr(name, value);
};

var _spreadAttribute = function _spreadAttribute(spread) {
  _forOwn(spread, _flipAttr);
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

var _div$wrapper = function _div$wrapper(_fn, _fn2) {
  elementOpenStart("div");
  attr("attr", _fn);

  _spreadAttribute(_fn2);

  elementOpenEnd("div");
  return elementClose("div");
};

function render() {
  function fn() {}
  var div = _jsxWrapper(_div$wrapper, [fn(), fn()]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}