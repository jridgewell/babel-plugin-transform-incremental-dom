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

function getDiv() {
  elementOpen("div");
  text("Bottom");
  return elementClose("div");
}

function render() {
  elementOpen("div");

  _renderArbitrary(true && (elementOpen("div"), (elementOpen("div"), text("Top"), elementClose("div")), _renderArbitrary(getDiv()), elementClose("div")) || elementVoid("other"));

  return elementClose("div");
}