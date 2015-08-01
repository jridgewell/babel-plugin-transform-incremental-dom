var _one2, _two2, _two3;

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

var children = [1, 2, 3, (function _ref() {
  elementOpen("array");
  text("will be wrapped");
  elementClose("array");
}, _ref.__jsxDOMWrapper = true, _ref)];

var map = [1, 2, 3].map(function (i) {
  return (function _ref2() {
    elementOpen("map");
    var _i = i;

    _renderArbitrary(_i);

    elementClose("map");
  }, _ref2.__jsxDOMWrapper = true, _ref2);
});

var map2 = function map2() {
  [1, 2, 3].map(function (i) {
    return (function _ref3() {
      elementOpen("map2");
      var _i2 = i;

      _renderArbitrary(_i2);

      elementClose("map2");
    }, _ref3.__jsxDOMWrapper = true, _ref3);
  });
};

var each = [1, 2, 3].forEach(function (i) {});

var declarator = (function _declarator() {
  elementOpen("div");
  text("will be wrapped");
  elementClose("div");
}, _declarator.__jsxDOMWrapper = true, _declarator);

var assignment;
assignment = (function _assignment() {
  elementOpen("div");
  text("will be wrapped");
  elementClose("div");
}, _assignment.__jsxDOMWrapper = true, _assignment);

var i = 1;
var _ref4 = i++;
var one = (function _one() {
  elementOpen("span");

  _renderArbitrary(_ref4);

  elementClose("span");
}, _one.__jsxDOMWrapper = true, _one);

var _ref5 = i++;
var two = (function _two() {
  elementOpen("span");

  _renderArbitrary(_ref5);

  elementClose("span");
}, _two.__jsxDOMWrapper = true, _two);

elementOpen("fin");
var _children = children;

_renderArbitrary(_children);

var _ref6 = (elementOpen("span"), text("won't be wrapped"), elementClose("span"));

_renderArbitrary(_ref6);

elementOpen("div");
_one = one;

_renderArbitrary(_one);

elementVoid("br");
_two = two;

_renderArbitrary(_two2);

elementVoid("br");
_two3 = two;

_renderArbitrary(_two3);

elementClose("div");
return elementClose("fin");
