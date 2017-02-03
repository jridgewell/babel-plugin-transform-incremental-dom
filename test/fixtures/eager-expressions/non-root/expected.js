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