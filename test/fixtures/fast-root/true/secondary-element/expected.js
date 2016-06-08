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

var _wrapper = function _wrapper(_files$map) {
  elementOpen("ul");

  _renderArbitrary(_files$map);

  return elementClose("ul");
},
    _statics = ["key", ""],
    _wrapper2 = function _wrapper2(_file$name, _file, _ref, _file$name2) {
  elementOpen("li", _file$name, (_statics[1] = _file$name, _statics), "file", _file, "onclick", _ref);

  _renderArbitrary(_file$name2);

  return elementClose("li");
};

function render() {
  var ul = _jsxWrapper(_wrapper, [files.map(function (file) {
    return _jsxWrapper(_wrapper2, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  })]);
  elementOpen("root");

  _renderArbitrary(ul);

  return elementClose("root");
}