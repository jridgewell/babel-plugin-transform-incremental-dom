var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
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

var _li$statics = ["key", ""],
    _li$wrapper = function _li$wrapper(_file$name, _file, _onclick, _file$name2) {
  elementOpen("li", _file$name, (_li$statics[1] = _file$name, _li$statics), "file", _file, "onclick", _onclick);

  _renderArbitrary(_file$name2);

  return elementClose("li");
};

function render() {
  elementOpen("ul");

  _renderArbitrary(
  // @incremental-dom disable-fastRoot
  files.map(function (file) {
    return _jsxWrapper(_li$wrapper, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  }));

  return elementClose("ul");
}