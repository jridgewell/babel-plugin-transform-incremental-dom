var _hasOwn = Object.hasOwnProperty;

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

var children = [1, 2, 3, (function _jsxWrapper() {
  elementOpen("span");
  text("will be wrapped");
  elementClose("span");
}, _jsxWrapper.__jsxDOMWrapper = true, _jsxWrapper)];

var declarator = (function () {
  elementOpen("div");
  text("will be wrapped");
  elementClose("div");
}, declarator.__jsxDOMWrapper = true, declarator);

var assignment;
assignment = (function () {
  elementOpen("div");
  text("will be wrapped");
  elementClose("div");
}, assignment.__jsxDOMWrapper = true, assignment);

elementOpen("div");

_renderArbitrary(children);

_renderArbitrary((elementOpen("span"), text("won't be wrapped"), elementClose("span")));

return elementClose("div");
