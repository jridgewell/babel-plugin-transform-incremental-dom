var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
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
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === "object" && String(child) === "[object Object]") {
    _forOwn(child, _renderArbitrary);
  }
};

function render() {
  // @fastRoot false
  elementOpen("ul");

  _renderArbitrary(files.map(function (file) {
    return _jsxWrapper(function (_file$name, _file, _ref, _file$name2) {
      elementOpen("li", _file$name, ["key", _file$name], "file", _file, "onclick", _ref);

      _renderArbitrary(_file$name2);

      return elementClose("li");
    }, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  }));

  return elementClose("ul");
}