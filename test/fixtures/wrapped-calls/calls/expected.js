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

var _wrapper = function _wrapper(_i, _jsxWrapper2) {
  elementOpen("li");

  _renderArbitrary(renderMessage(_i, _jsxWrapper2));

  return elementClose("li");
},
    _wrapper2 = function _wrapper2(_i2, _jsxWrapper3) {
  elementOpen("li");

  _renderArbitrary(renderMessage(_i2, _jsxWrapper3));

  return elementClose("li");
};

function message(txt) {
  elementOpen("span");

  _renderArbitrary(txt);

  return elementClose("span");
}
function renderMessage(i, msg) {
  elementOpen("em");

  _renderArbitrary(msg);

  _renderArbitrary(i);

  return elementClose("em");
}

function render() {
  elementOpen("ul");

  _renderArbitrary([0, 1, 2, 3, 4].map(function (i) {
    return _jsxWrapper(_wrapper, [i, _jsxWrapper(renderMessage, ["hello", i + 1])]);
  }, function (i) {
    return _jsxWrapper(_wrapper2, [i, _jsxWrapper(message, ["hello"])]);
  }));

  return elementClose("ul");
}