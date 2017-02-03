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

var _li$statics = ["key", ""];
function render() {
  elementOpen("ul");
  files.map(function (file) {
    var _li$key;

    elementOpen("li", _li$key = file.name, (_li$statics[1] = _li$key, _li$statics), "file", file, "onclick", function (e) {
      return fileClicked(e, file);
    });

    _renderArbitrary(file.name);

    return elementClose("li");
  });
  return elementClose("ul");
}