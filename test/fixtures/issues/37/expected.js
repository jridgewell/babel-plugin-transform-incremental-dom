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

var _statics = ["id", "app"],
    _statics2 = ["type", "text", "id", "testInput"],
    _wrapper = function _wrapper() {
  elementOpen("div");
  elementVoid("input", "__uuid__0__", _statics2);
  return elementClose("div");
},
    _statics3 = ["type", "text", "id", "testInput"],
    _statics4 = ["id", "app"],
    _statics5 = ["id", "app"],
    _statics6 = ["id", "app"];

function renderMain() {
  var renderInput = function renderInput() {
    return _jsxWrapper(_wrapper);
  };
  elementOpen("div", "__uuid__1__", _statics);

  _renderArbitrary(renderInput());

  return elementClose("div");
}

var renderInput = function renderInput() {
  elementOpen("div");
  elementVoid("input", "__uuid__2__", _statics3);
  return elementClose("div");
};

function renderMain() {
  elementOpen("div", "__uuid__3__", _statics4);

  _renderArbitrary(renderInput());

  return elementClose("div");
}

// - - - - - - -

function renderMain(flag) {
  if (flag) {
    elementOpen("div", "__uuid__4__", _statics5);
    return elementClose("div");
  }
  elementOpen("div", "__uuid__5__", _statics6);

  _renderArbitrary(renderInput());

  return elementClose("div");
}