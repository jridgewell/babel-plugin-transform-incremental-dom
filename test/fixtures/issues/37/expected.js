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

var _div$statics = ["id", "app"],
    _input$statics = ["type", "text", "id", "testInput"],
    _renderInput = function _renderInput() {
  elementOpen("div");
  elementVoid("input", "__uuid__0__", _input$statics);
  return elementClose("div");
},
    _input$statics2 = ["type", "text", "id", "testInput"],
    _div$statics2 = ["id", "app"],
    _div$statics3 = ["id", "app"],
    _div$statics4 = ["id", "app"];

function renderMain() {
  var renderInput = function renderInput() {
    return _jsxWrapper(_renderInput);
  };
  elementOpen("div", "__uuid__1__", _div$statics);

  _renderArbitrary(renderInput());

  return elementClose("div");
}

var renderInput = function renderInput() {
  elementOpen("div");
  elementVoid("input", "__uuid__2__", _input$statics2);
  return elementClose("div");
};

function renderMain() {
  elementOpen("div", "__uuid__3__", _div$statics2);

  _renderArbitrary(renderInput());

  return elementClose("div");
}

// - - - - - - -

function renderMain(flag) {
  if (flag) {
    elementOpen("div", "__uuid__4__", _div$statics3);
    return elementClose("div");
  }
  elementOpen("div", "__uuid__5__", _div$statics4);

  _renderArbitrary(renderInput());

  return elementClose("div");
}