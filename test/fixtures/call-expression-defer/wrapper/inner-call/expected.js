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

var _li$wrapper = function _li$wrapper(_deferred, _args) {
  elementOpen("li");

  _renderArbitrary(_deferred(_args));

  return elementClose("li");
},
    _ul$wrapper = function _ul$wrapper(_deferred2, _args2) {
  elementOpen("ul");

  _renderArbitrary(_deferred2.map(_args2));

  return elementClose("ul");
};

function renderMessage(i) {
  elementOpen("em");
  text("my message " + i);
  return elementClose("em");
}

function render() {
  var ul = _jsxWrapper(_ul$wrapper, [[0, 1, 2, 3, 4], function (i) {
    return _jsxWrapper(_li$wrapper, [renderMessage, i]);
  }]);
  elementOpen("root");

  _renderArbitrary(ul);

  return elementClose("root");
}