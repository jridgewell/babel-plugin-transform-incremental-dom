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

var _div$wrapper = function _div$wrapper(_deferred, _args, _deferred2, _b, _args2, _deferred3, _b2, _args3) {
  elementOpen("div");

  _renderArbitrary(_deferred(_args));

  _renderArbitrary(_b == 1 ? _deferred2(_args2) : _deferred2());

  _renderArbitrary(_b2 == 1 ? _deferred3() : _deferred3(_args3));

  return elementClose("div");
};

function render() {
  var _b = 0,
      _b2 = 0;

  function fn() {}
  var div = _jsxWrapper(_div$wrapper, [fn, args, true ? (_b = 1, fn) : (_b = 2, fn2), _b, _b == 1 ? args : null, true ? (_b2 = 1, fn) : (_b2 = 2, fn2), _b2, _b2 == 2 ? args : null]);
  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}