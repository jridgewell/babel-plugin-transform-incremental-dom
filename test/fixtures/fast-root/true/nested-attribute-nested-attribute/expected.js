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

var _span$statics = ["key", ""],
    _span$wrapper = function _span$wrapper(_file$name3, _file2, _onclick2, _file$name4) {
  elementOpen("span");
  _span$statics[1] = _file$name3;
  elementOpen("span", _file$name3, _span$statics, "file", _file2, "onclick", _onclick2);

  _renderArbitrary(_file$name4);

  elementClose("span");
  return elementClose("span");
},
    _li$wrapper = function _li$wrapper(_file$name, _file, _onclick, _file$name2) {
  elementOpen("li", null, null, "attr", _jsxWrapper(_span$wrapper, [_file$name, _file, _onclick, _file$name2]));
  return elementClose("li");
};

function render() {
  elementOpen("ul", null, null, "files", files.map(function (file) {
    return _jsxWrapper(_li$wrapper, [file.name, file, function (e) {
      return fileClicked(e, file);
    }, file.name]);
  }));
  return elementClose("ul");
}