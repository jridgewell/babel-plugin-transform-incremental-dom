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

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _div$statics = ["key", ""],
    _div$wrapper = function _div$wrapper(_attr, _attr2, _key) {
  elementOpen("div", null, null, "attr", _attr);
  _div$statics[1] = _key;
  elementVoid("div", _key, _div$statics, "attr2", _attr2);
  return elementClose("div");
};

function render() {
  var div = _jsxWrapper(_div$wrapper, [i++, i++, i++]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}