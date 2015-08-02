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

var _ref3 = i++,
    _ref5 = i++;

elementOpen("root");
elementOpen("div", null, ["class", "my-class"]);
elementClose("div");
elementOpen("div", null, ["class", "my-class"]);
elementClose("div");
elementOpen("div", null, null, "class", myClass);
elementClose("div");
elementOpen("div", null, null, "class", props.myClass);
elementClose("div");
elementOpen("div", null, null, "prop", x ? (function _ref() {
  return elementVoid("span");
}, _ref.__jsxDOMWrapper = true, _ref) : (function _ref2() {
  return elementVoid("span");
}, _ref2.__jsxDOMWrapper = true, _ref2));
elementClose("div");
elementOpen("div", null, null, "prop", (function _ref4() {
  return elementVoid("span", null, null, "attr", _ref3);
}, _ref4.__jsxDOMWrapper = true, _ref4));
elementClose("div");
elementOpen("div", null, null, "prop", (function _ref6() {
  elementOpen("span");

  _renderArbitrary(_ref5);

  return elementClose("span");
}, _ref6.__jsxDOMWrapper = true, _ref6));
elementClose("div");
return elementClose("root");
