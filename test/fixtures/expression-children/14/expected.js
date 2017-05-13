var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _hasOwn = Object.prototype.hasOwnProperty;

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

var _span$wrapper = function _span$wrapper(_i, _child, _i2) {
  elementOpen("span", null, null, "attr", _i);

  _renderArbitrary(_child);

  _renderArbitrary(_i2);

  return elementClose("span");
};

function render() {
  var mapNested5 = [1, 2, 3].map(function (i) {
    elementOpen("outer5");
    elementOpen("inner5", null, null, "attr", _jsxWrapper(_span$wrapper, [i, i++, i]));
    elementClose("inner5");
    return elementClose("outer5");
  });
}