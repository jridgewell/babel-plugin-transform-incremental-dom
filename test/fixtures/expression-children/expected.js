var _ref7, _ref8, _one2, _two2, _two3;

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
  var _i;

  return (_i = i, function _ref2() {
    elementOpen("map");

    _renderArbitrary(_i);

    elementClose("map");
  }, _ref2.__jsxDOMWrapper = true, _ref2);
});

var map2 = [1, 2, 3].map(function (i) {
  var _i2;

  var el = (_i2 = i, function _el() {
    elementOpen("map2");

    _renderArbitrary(_i2);

    elementClose("map2");
  }, _el.__jsxDOMWrapper = true, _el);
  return el;
});

var map3 = function map3() {
  [1, 2, 3].map(function (i) {
    var _i3;

    return (_i3 = i, function _ref3() {
      elementOpen("map3");

      _renderArbitrary(_i3);

      elementClose("map3");
    }, _ref3.__jsxDOMWrapper = true, _ref3);
  });
};

var each = [1, 2, 3].forEach(function (i) {});

var attr = 0;
var attrs = [1, 2, 3].map(function () {
  var _ref4, _ref5;

  return (_ref4 = attr++, _ref5 = attr++, function _ref6() {
    elementOpen("each", null, null, "attr", _ref4);

    _renderArbitrary(_ref5);

    elementClose("each");
  }, _ref6.__jsxDOMWrapper = true, _ref6);
});

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
var one = (_ref7 = i++, function _one() {
  elementOpen("span");

  _renderArbitrary(_ref7);

  elementClose("span");
}, _one.__jsxDOMWrapper = true, _one);
var two = (_ref8 = i++, function _two() {
  elementOpen("span");

  _renderArbitrary(_ref8);

  elementClose("span");
}, _two.__jsxDOMWrapper = true, _two);

elementOpen("fin");
var _children = children;

_renderArbitrary(_children);

var _ref9 = (elementOpen("span"), text("won't be wrapped"), elementClose("span"));

_renderArbitrary(_ref9);

elementOpen("div");
_one2 = one;

_renderArbitrary(_one2);

elementVoid("br");
_two2 = two;

_renderArbitrary(_two2);

elementVoid("br");
_two3 = two;

_renderArbitrary(_two3);

elementClose("div");
return elementClose("fin");
