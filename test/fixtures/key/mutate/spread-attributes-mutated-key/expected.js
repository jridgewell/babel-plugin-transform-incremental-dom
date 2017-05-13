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

var _div$statics = ["key", ""];
function render() {
  var _spread, _div$key;

  _spread = props;
  _div$key = _div$statics[1] = props.key++;
  elementOpenStart("div", _div$key, _div$statics);

  _spreadAttribute(_spread);

  elementOpenEnd("div");

  _renderArbitrary(_hasOwn(_spread, "children") ? _spread.children : undefined);

  return elementClose("div");
}