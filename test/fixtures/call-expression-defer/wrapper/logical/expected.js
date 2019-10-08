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

var _div$wrapper = function _div$wrapper(_deferred, _b, _deferred2, _b2, _child, _child2, _deferred3, _b3, _deferred4, _b4, _deferred5, _b5, _deferred6, _b6) {
  elementOpen("div");

  _renderArbitrary(_b == 1 ? _deferred() : _deferred);

  _renderArbitrary(_b2 == 1 ? _deferred2() : _deferred2);

  _renderArbitrary(_child);

  _renderArbitrary(_child2);

  _renderArbitrary(_b3 == 1 ? _deferred3() : _deferred3);

  _renderArbitrary(_b4 == 1 ? _deferred4() : _deferred4);

  _renderArbitrary(_b5 == 1 ? _deferred5() : _b5 == 2 ? _deferred5() : _deferred5);

  _renderArbitrary(_b6 == 1 ? _deferred6() : _b6 == 2 ? _deferred6() : _deferred6);

  return elementClose("div");
};

function render() {
  var _b = 0,
      _b2 = 0,
      _b3 = 0,
      _b4 = 0,
      _b5 = 0,
      _b6 = 0;

  function fn() {}

  var div = _jsxWrapper(_div$wrapper, [true && (_b = 1, fn), _b, true || (_b2 = 1, fn), _b2, fn() || true, fn() && true, (1, 2, true && (_b3 = 1, fn)), _b3, (1, 2, true || (_b4 = 1, fn)), _b4, true ? true && (_b5 = 1, fn) : true && (_b5 = 2, fn), _b5, true ? true || (_b6 = 1, fn) : true || (_b6 = 2, fn), _b6]);

  elementOpen("root");

  _renderArbitrary(div);

  return elementClose("root");
}