var _hasOwn = Object.prototype.hasOwnProperty;

function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || (type === "string" || child && child instanceof String)) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else {
    _forOwn(child, _renderArbitrary);
  }
}

function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

var _ref = i++,
    _ref2 = i++;

elementOpen("root");
elementOpen("div", null, ["class", "my-class"]);
elementClose("div");
elementOpen("div", null, ["class", "my-class"]);
elementClose("div");
elementOpen("div", null, null, "class", myClass);
elementClose("div");
elementOpen("div", null, null, "class", props.myClass);
elementClose("div");
elementOpen("div", null, null, "prop", x ? _jsxWrapper(function () {
  return elementVoid("span");
}) : _jsxWrapper(function () {
  return elementVoid("span");
}));
elementClose("div");
elementOpen("div", null, null, "prop", _jsxWrapper(function () {
  return elementVoid("span", null, null, "attr", _ref);
}));
elementClose("div");
elementOpen("div", null, null, "prop", _jsxWrapper(function () {
  elementOpen("span");

  _renderArbitrary(_ref2);

  return elementClose("span");
}));
elementClose("div");
return elementClose("root");
