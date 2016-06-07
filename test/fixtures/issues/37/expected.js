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

function renderMain() {
  var renderInput = function renderInput() {
    return _jsxWrapper(function () {
      elementOpen("div");
      elementVoid("input", null, null, "type", "text", "id", "testInput");
      return elementClose("div");
    });
  };
  elementOpen("div", null, null, "id", "app");

  _renderArbitrary(renderInput());

  return elementClose("div");
}

var renderInput = function renderInput() {
  elementOpen("div");
  elementVoid("input", null, null, "type", "text", "id", "testInput");
  return elementClose("div");
};

function renderMain() {
  elementOpen("div", null, null, "id", "app");

  _renderArbitrary(renderInput());

  return elementClose("div");
}

// - - - - - - -

function renderMain(flag) {
  if (flag) {
    elementOpen("div", null, null, "id", "app");
    return elementClose("div");
  }
  elementOpen("div", null, null, "id", "app");

  _renderArbitrary(renderInput());

  return elementClose("div");
}