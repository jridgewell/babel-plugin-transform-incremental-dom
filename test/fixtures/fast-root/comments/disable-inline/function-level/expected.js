function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _renderArbitrary = function _renderArbitrary(child) {
  var type = _typeof(child);

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

var _li$statics = ["key", ""],
    _li$wrapper = function _li$wrapper(_file$name, _file, _onclick, _file$name2) {
  _li$statics[1] = _file$name;
  elementOpen("li", _file$name, _li$statics, "file", _file, "onclick", _onclick);

  _renderArbitrary(_file$name2);

  return elementClose("li");
};

function render() {
  // @incremental-dom disable-fastRoot
  elementOpen("ul");

  _renderArbitrary(files.map(function (file) {
    return _jsxWrapper(_li$wrapper, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  }));

  return elementClose("ul");
}