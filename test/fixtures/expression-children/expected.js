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
  elementOpen("array");
  text("will be wrapped");
  elementClose("array");
}, _jsxWrapper.__jsxDOMWrapper = true, _jsxWrapper)];

var map = [1, 2, 3].map(function (i) {
  return (function _jsxWrapper2() {
    elementOpen("map");

    _renderArbitrary(i);

    elementClose("map");
  }, _jsxWrapper2.__jsxDOMWrapper = true, _jsxWrapper2);
});

var map2 = function map2() {
  [1, 2, 3].map(function (i) {
    return (function _jsxWrapper3() {
      elementOpen("map2");

      _renderArbitrary(i);

      elementClose("map2");
    }, _jsxWrapper3.__jsxDOMWrapper = true, _jsxWrapper3);
  });
};

var each = [1, 2, 3].forEach(function (i) {});

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

elementOpen("fin");

_renderArbitrary(children);

_renderArbitrary((elementOpen("span"), text("won't be wrapped"), elementClose("span")));

return elementClose("fin");
