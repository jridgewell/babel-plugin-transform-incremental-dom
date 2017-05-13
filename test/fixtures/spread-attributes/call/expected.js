var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

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

var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (prop !== "children" && _hasOwn.call(spread, prop)) attr(prop, spread[prop]);
  }
};

var _test$wrapper = function _test$wrapper(_props) {
  elementOpenStart("div");

  _spreadAttribute(_props);

  elementOpenEnd("div");

  _renderArbitrary(_hasOwn(_props, "children") ? _props.children : undefined);

  return elementClose("div");
};

function render() {
  var _props2;

  var test = _jsxWrapper(_test$wrapper, [props()]);
  elementOpenStart("div");

  _spreadAttribute(_props2 = props());

  elementOpenEnd("div");

  _renderArbitrary(_hasOwn(_props2, "children") ? _props2.children : undefined);

  return elementClose("div");
}