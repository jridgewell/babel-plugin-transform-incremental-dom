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

var _one$wrapper = function _one$wrapper(_child) {
  elementOpen("one");

  _renderArbitrary(_child);

  return elementClose("one");
},
    _two$wrapper = function _two$wrapper(_child2) {
  elementOpen("two");

  _renderArbitrary(_child2);

  return elementClose("two");
};

function render() {
  var i = 1;
  var one = _jsxWrapper(_one$wrapper, [i++]);
  var two = _jsxWrapper(_two$wrapper, [i++]);
}