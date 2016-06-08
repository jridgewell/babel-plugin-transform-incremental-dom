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
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === "object" && String(child) === "[object Object]") {
    _forOwn(child, _renderArbitrary);
  }
};

function render() {
  elementOpen("root");
  elementOpen("ul");
  files.map(function (file) {
    var _file$name;

    elementOpen("li", _file$name = file.name, ["key", _file$name], "file", file, "onclick", function (e) {
      return fileClicked(e, file);
    });

    _renderArbitrary(file.name);

    return elementClose("li");
  });
  elementClose("ul");
  return elementClose("root");
}