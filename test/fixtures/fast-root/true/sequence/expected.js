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

var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  return elementVoid("span");
},
    _wrapper2 = function _wrapper2() {
  return elementVoid("span");
},
    _wrapper3 = function _wrapper3() {
  return elementVoid("span");
},
    _wrapper4 = function _wrapper4() {
  return elementVoid("span");
};

function render() {
  elementOpen("ul");

  _renderArbitrary((files.map(function (file) {
    return _jsxWrapper(_wrapper);
  }), null));

  files.map(function (file) {
    return _jsxWrapper(_wrapper2);
  });
  files.map(function (file) {
    return elementVoid("span");
  });
  null;
  files.map(function (file) {
    return elementVoid("span");
  });

  _renderArbitrary((_jsxWrapper(_wrapper3), null));

  null;
  elementVoid("span");

  _renderArbitrary((null, _jsxWrapper(_wrapper4), null));

  return elementClose("ul");
}