var _incrementalDom = require("incremental-dom");

var _hasOwn = Object.prototype.hasOwnProperty;

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || type === "object" && child instanceof String) {
    (0, _incrementalDom.text)(child);
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

var todoItems = function todoItems(items) {
  // @incremental-dom enable-fastRoot
  return items.map(function (x) {
    (0, _incrementalDom.elementOpen)("li");
    (0, _incrementalDom.text)("x.text");
    return (0, _incrementalDom.elementClose)("li");
  });
};

(0, _incrementalDom.patch)(container, function () {
  (0, _incrementalDom.elementOpen)("div");

  _renderArbitrary(todoItems(items));

  return (0, _incrementalDom.elementClose)("div");
});