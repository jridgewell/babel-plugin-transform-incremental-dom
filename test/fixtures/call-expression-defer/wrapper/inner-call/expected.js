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

var _wrapper = function _wrapper(_deferred, _args) {
  elementOpen("ul");

  _renderArbitrary(_deferred.map(_args));

  return elementClose("ul");
},
    _wrapper2 = function _wrapper2(_deferred2, _args2) {
  elementOpen("li");

  _renderArbitrary(_deferred2(_args2));

  return elementClose("li");
};

function renderMessage(i) {
  elementOpen("em");
  text("my message " + i);
  return elementClose("em");
}

function render() {
  var ul = _jsxWrapper(_wrapper, [[0, 1, 2, 3, 4], function (i) {
    return _jsxWrapper(_wrapper2, [renderMessage, i]);
  }]);
  elementOpen("root");

  _renderArbitrary(ul);

  return elementClose("root");
}