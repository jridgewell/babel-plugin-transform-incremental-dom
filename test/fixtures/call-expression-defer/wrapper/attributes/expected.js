var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || type === "object" && child instanceof String) {
    text(child);
  } else if (Array.isArray(child)) {
    for (var i = 0; i < child.length; i++) {
      _renderArbitrary(child[i]);
    }
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
      for (var prop in child) {
        if (_hasOwn.call(child, i)) _renderArbitrary(child[i]);
      }
    }
  }
};

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (_hasOwn.call(spread, prop)) attr(prop, spread[prop]);
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