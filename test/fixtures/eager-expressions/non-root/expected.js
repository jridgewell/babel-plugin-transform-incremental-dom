function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _renderArbitrary = function _renderArbitrary(child) {
  var type = _typeof(child);

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

var _test$wrapper = function _test$wrapper(_attr, _first, _child, _child2, _second, _child3) {
  elementOpen("div", null, null, "attr", _attr);
  elementOpen("div", null, null, "first", _first);

  _renderArbitrary(_child);

  elementClose("div");

  _renderArbitrary(_child2);

  elementOpen("div", null, null, "second", _second);

  _renderArbitrary(_child3);

  elementClose("div");
  return elementClose("div");
};

function render() {
  var test = _jsxWrapper(_test$wrapper, [i++, i++, i++, i++, i++, i++]);

  elementOpen("root");

  _renderArbitrary(test);

  return elementClose("root");
}