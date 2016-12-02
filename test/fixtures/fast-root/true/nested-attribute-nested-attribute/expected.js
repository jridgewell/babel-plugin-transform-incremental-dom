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

var _statics = ["key", ""],
    _wrapper = function _wrapper(_file$name3, _file2, _ref2, _file$name4) {
  elementOpen("span");
  elementOpen("span", _file$name3, (_statics[1] = _file$name3, _statics), "file", _file2, "onclick", _ref2);

  _renderArbitrary(_file$name4);

  elementClose("span");
  return elementClose("span");
},
    _wrapper2 = function _wrapper2(_file$name, _file, _ref, _file$name2) {
  elementOpen("li", null, null, "attr", _jsxWrapper(_wrapper, [_file$name, _file, _ref, _file$name2]));
  return elementClose("li");
};

function render() {
  elementOpen("ul", null, null, "files", files.map(function (file) {
    return _jsxWrapper(_wrapper2, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  }));
  return elementClose("ul");
}