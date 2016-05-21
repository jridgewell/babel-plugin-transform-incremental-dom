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

  if (type === "number" || type === "string" || child && child instanceof String) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (String(child) === "[object Object]") {
    _forOwn(child, _renderArbitrary);
  }
};

function render() {
  elementOpen("ul", null, null, "files", files.map(function (file) {
    return _jsxWrapper(function (_file$name, _file, _ref, _file$name2) {
      elementOpen("li", null, null, "attr", _jsxWrapper(function (_file$name3, _file2, _ref2, _file$name4) {
        elementOpen("span", _file$name3, ["key", _file$name3], "file", _file2, "onclick", _ref2);

        _renderArbitrary(_file$name4);

        return elementClose("span");
      }, [_file$name, _file, _ref, _file$name2]));
      return elementClose("li");
    }, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  }));
  return elementClose("ul");
}
