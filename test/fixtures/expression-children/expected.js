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
  items.push((function (_i) {
    function _ref2() {
      elementOpen("div");

      _renderArbitrary(_i);

      return elementClose("div");
    }

    _ref2.__jsxDOMWrapper = true;
    return _ref2;
  })(i));
}

for (var i = 0; i < 10; i++) {
  items[i] = (function (_i2) {
    function _items$i() {
      elementOpen("div");

      _renderArbitrary(_i2);

      return elementClose("div");
    }

    _items$i.__jsxDOMWrapper = true;
    return _items$i;
  })(i);
}

var map = [1, 2, 3].map(function (i) {
  var _i3 = i;

  return (function _ref3() {
    elementOpen("map");

    _renderArbitrary(_i3);

    return elementClose("map");
  }, _ref3.__jsxDOMWrapper = true, _ref3);
});

var map2 = [1, 2, 3].map(function (i) {
  var _i4 = i;

  var el = (function _el() {
    elementOpen("map2");

    _renderArbitrary(_i4);

    return elementClose("map2");
  }, _el.__jsxDOMWrapper = true, _el);
  return el;
});

var map3 = function map3() {
  [1, 2, 3].map(function (i) {
    var _i5 = i;

    return (function _ref4() {
      elementOpen("map3");

      _renderArbitrary(_i5);

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

var mapNested = [1, 2, 3].map(function (i) {
  var _i7 = i;

  return (function _ref10() {
    elementOpen("outer");
    elementOpen("inner");

    _renderArbitrary(_i7);

    elementClose("inner");
    return elementClose("outer");
  }, _ref10.__jsxDOMWrapper = true, _ref10);
});

var mapNested2 = [1, 2, 3].map(function (i) {
  var _i8 = i;

  return (function _ref11() {
    elementOpen("outer2");
    elementOpen("inner2");

    _renderArbitrary(_i8);

    elementClose("inner2");
    return elementClose("outer2");
  }, _ref11.__jsxDOMWrapper = true, _ref11);
});

var mapNested3 = [1, 2, 3].map(function (i) {
  var _i9 = i;

  return (function _ref12() {
    elementOpen("outer3");
    elementOpen("inner3", null, null, "attr", _i9);
    elementClose("inner3");
    return elementClose("outer3");
  }, _ref12.__jsxDOMWrapper = true, _ref12);
});

var mapNested4 = [1, 2, 3].map(function (i) {
  var _i10 = i,
      _i11 = i;

  return (function _ref14() {
    elementOpen("outer4");
    elementOpen("inner4", null, null, "attr", (function _ref13() {
      elementOpen("span", null, null, "attr", _i10);

      _renderArbitrary(_i11);

      return elementClose("span");
    }, _ref13.__jsxDOMWrapper = true, _ref13));
    elementClose("inner4");
    return elementClose("outer4");
  }, _ref14.__jsxDOMWrapper = true, _ref14);
});

elementOpen("fin");

_renderArbitrary(children);

elementOpen("span");
text("won't be wrapped");
elementClose("span");
elementOpen("div");

_renderArbitrary(one);

elementVoid("br");

_renderArbitrary(two);

elementVoid("br");

_renderArbitrary(two);

elementClose("div");
return elementClose("fin");
