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

  if (type === "number" || type === "string" || child && child instanceof String) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else {
    _forOwn(child, _renderArbitrary);
  }
};

var _wrapper = function _wrapper() {
  elementOpen("array");
  text("will be wrapped");
  return elementClose("array");
},
    _wrapper2 = function _wrapper2(_i) {
  elementOpen("div");

  _renderArbitrary(_i);

  return elementClose("div");
},
    _wrapper3 = function _wrapper3(_i2) {
  elementOpen("div");

  _renderArbitrary(_i2);

  return elementClose("div");
},
    _wrapper4 = function _wrapper4(_i3) {
  elementOpen("map");

  _renderArbitrary(_i3);

  return elementClose("map");
},
    _wrapper5 = function _wrapper5(_i4) {
  elementOpen("map2");

  _renderArbitrary(_i4);

  return elementClose("map2");
},
    _wrapper6 = function _wrapper6(_i5) {
  elementOpen("map3");

  _renderArbitrary(_i5);

  return elementClose("map3");
},
    _wrapper7 = function _wrapper7(_ref, _ref2) {
  elementOpen("attrs", null, null, "attr", _ref);

  _renderArbitrary(_ref2);

  return elementClose("attrs");
},
    _wrapper8 = function _wrapper8() {
  elementOpen("div");
  text("will be wrapped");
  return elementClose("div");
},
    _wrapper9 = function _wrapper9() {
  elementOpen("div");
  text("will be wrapped");
  return elementClose("div");
},
    _wrapper10 = function _wrapper10(_ref3) {
  elementOpen("one");

  _renderArbitrary(_ref3);

  return elementClose("one");
},
    _wrapper11 = function _wrapper11(_ref4) {
  elementOpen("two");

  _renderArbitrary(_ref4);

  return elementClose("two");
},
    _wrapper12 = function _wrapper12(_i6) {
  elementOpen("outer");
  elementOpen("inner");

  _renderArbitrary(_i6);

  elementClose("inner");
  return elementClose("outer");
},
    _wrapper13 = function _wrapper13(_i7) {
  elementOpen("outer2");
  elementOpen("inner2");

  _renderArbitrary(_i7);

  elementClose("inner2");
  return elementClose("outer2");
},
    _wrapper14 = function _wrapper14(_i8) {
  elementOpen("outer3");
  elementOpen("inner3", null, null, "attr", _i8);
  elementClose("inner3");
  return elementClose("outer3");
},
    _wrapper15 = function _wrapper15(_i11, _i12) {
  elementOpen("span", null, null, "attr", _i11);

  _renderArbitrary(_i12);

  return elementClose("span");
},
    _wrapper16 = function _wrapper16(_i9, _i10) {
  elementOpen("outer4");
  elementOpen("inner4", null, null, "attr", _jsxWrapper(_wrapper15, [_i9, _i10]));
  elementClose("inner4");
  return elementClose("outer4");
},
    _wrapper17 = function _wrapper17(_i15, _ref6, _i16) {
  elementOpen("span", null, null, "attr", _i15);

  _renderArbitrary(_ref6);

  _renderArbitrary(_i16);

  return elementClose("span");
},
    _wrapper18 = function _wrapper18(_i13, _ref5, _i14) {
  elementOpen("outer5");
  elementOpen("inner5", null, null, "attr", _jsxWrapper(_wrapper17, [_i13, _ref5, _i14]));
  elementClose("inner5");
  return elementClose("outer5");
};

function render() {
  var children = [1, 2, 3, _jsxWrapper(_wrapper)];

  var items = [];
  for (var i = 0; i < 10; i++) {
    items.push(_jsxWrapper(_wrapper2, [i]));
  }

  for (var i = 0; i < 10; i++) {
    items[i] = _jsxWrapper(_wrapper3, [i]);
  }

  var map = [1, 2, 3].map(function (i) {
    return _jsxWrapper(_wrapper4, [i]);
  });

  var map2 = [1, 2, 3].map(function (i) {
    var el = _jsxWrapper(_wrapper5, [i]);
    return el;
  });

  var map3 = function map3() {
    [1, 2, 3].map(function (i) {
      return _jsxWrapper(_wrapper6, [i]);
    });
  };

  var attr = 0;
  var attrs = [1, 2, 3].map(function () {
    return _jsxWrapper(_wrapper7, [attr++, attr++]);
  });

  var declarator = _jsxWrapper(_wrapper8);

  var assignment;
  assignment = _jsxWrapper(_wrapper9);

  var i = 1;
  var one = _jsxWrapper(_wrapper10, [i++]);
  var two = _jsxWrapper(_wrapper11, [i++]);

  var mapNested = [1, 2, 3].map(function (i) {
    return _jsxWrapper(_wrapper12, [i]);
  });

  var mapNested2 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(_wrapper13, [i]);
  });

  var mapNested3 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(_wrapper14, [i]);
  });

  var mapNested4 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(_wrapper16, [i, i]);
  });

  var mapNested5 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(_wrapper18, [i, i++, i]);
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
}