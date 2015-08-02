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
  return elementClose("array");
}, _ref.__jsxDOMWrapper = true, _ref)];

var items = [];
for (var i = 0; i < 10; i++) {
  // TODO all 9s
  var _i = i;

  items.push((function _ref2() {
    elementOpen("div");

    _renderArbitrary(_i);

    return elementClose("div");
  }, _ref2.__jsxDOMWrapper = true, _ref2));
}

var map = [1, 2, 3].map(function (i) {
  var _i2 = i;

  return (function _ref3() {
    elementOpen("map");

    _renderArbitrary(_i2);

    return elementClose("map");
  }, _ref3.__jsxDOMWrapper = true, _ref3);
});

var map2 = [1, 2, 3].map(function (i) {
  var _i3 = i;

  var el = (function _el() {
    elementOpen("map2");

    _renderArbitrary(_i3);

    return elementClose("map2");
  }, _el.__jsxDOMWrapper = true, _el);
  return el;
});

var map3 = function map3() {
  [1, 2, 3].map(function (i) {
    var _i4 = i;

    return (function _ref4() {
      elementOpen("map3");

      _renderArbitrary(_i4);

      return elementClose("map3");
    }, _ref4.__jsxDOMWrapper = true, _ref4);
  });
};

var each = [1, 2, 3].forEach(function (i) {});

var attr = 0;
var attrs = [1, 2, 3].map(function () {
  var _ref5 = attr++,
      _ref6 = attr++;

  return (function _ref7() {
    elementOpen("attrs", null, null, "attr", _ref5);

    _renderArbitrary(_ref6);

    return elementClose("attrs");
  }, _ref7.__jsxDOMWrapper = true, _ref7);
});

var declarator = (function _declarator() {
  elementOpen("div");
  text("will be wrapped");
  return elementClose("div");
}, _declarator.__jsxDOMWrapper = true, _declarator);

var assignment;
assignment = (function _assignment() {
  elementOpen("div");
  text("will be wrapped");
  return elementClose("div");
}, _assignment.__jsxDOMWrapper = true, _assignment);

var i = 1;

var _ref8 = i++;

var one = (function _one() {
  elementOpen("one");

  _renderArbitrary(_ref8);

  return elementClose("one");
}, _one.__jsxDOMWrapper = true, _one);

var _ref9 = i++;

var two = (function _two() {
  elementOpen("two");

  _renderArbitrary(_ref9);

  return elementClose("two");
}, _two.__jsxDOMWrapper = true, _two);

elementOpen("fin");

_renderArbitrary(children);

_renderArbitrary((elementOpen("span"), text("won't be wrapped"), elementClose("span")));

elementOpen("div");

_renderArbitrary(one);

elementVoid("br");

_renderArbitrary(two);

elementVoid("br");

_renderArbitrary(two);

elementClose("div");
return elementClose("fin");
