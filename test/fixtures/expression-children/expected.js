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

function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

var _hasOwn = Object.prototype.hasOwnProperty;

function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

function render() {
  var children = [1, 2, 3, _jsxWrapper(function () {
    elementOpen("array");
    text("will be wrapped");
    return elementClose("array");
  })];

  var items = [];

  var _loop = function () {
    var _i = i;

    items.push(_jsxWrapper(function () {
      elementOpen("div");

      _renderArbitrary(_i);

      return elementClose("div");
    }));
  };

  for (var i = 0; i < 10; i++) {
    _loop();
  }

  var _loop2 = function () {
    var _i2 = i;

    items[i] = _jsxWrapper(function () {
      elementOpen("div");

      _renderArbitrary(_i2);

      return elementClose("div");
    });
  };

  for (var i = 0; i < 10; i++) {
    _loop2();
  }

  var map = [1, 2, 3].map(function (i) {
    var _i3 = i;

    return _jsxWrapper(function () {
      elementOpen("map");

      _renderArbitrary(_i3);

      return elementClose("map");
    });
  });

  var map2 = [1, 2, 3].map(function (i) {
    var _i4 = i;

    var el = _jsxWrapper(function () {
      elementOpen("map2");

      _renderArbitrary(_i4);

      return elementClose("map2");
    });
    return el;
  });

  var map3 = function map3() {
    [1, 2, 3].map(function (i) {
      var _i5 = i;

      return _jsxWrapper(function () {
        elementOpen("map3");

        _renderArbitrary(_i5);

        return elementClose("map3");
      });
    });
  };

  var attr = 0;
  var attrs = [1, 2, 3].map(function () {
    var _ref = attr++,
        _ref2 = attr++;

    return _jsxWrapper(function () {
      elementOpen("attrs", null, null, "attr", _ref);

      _renderArbitrary(_ref2);

      return elementClose("attrs");
    });
  });

  var declarator = _jsxWrapper(function () {
    elementOpen("div");
    text("will be wrapped");
    return elementClose("div");
  });

  var assignment;
  assignment = _jsxWrapper(function () {
    elementOpen("div");
    text("will be wrapped");
    return elementClose("div");
  });

  var i = 1;

  var _ref3 = i++;

  var one = _jsxWrapper(function () {
    elementOpen("one");

    _renderArbitrary(_ref3);

    return elementClose("one");
  });

  var _ref4 = i++;

  var two = _jsxWrapper(function () {
    elementOpen("two");

    _renderArbitrary(_ref4);

    return elementClose("two");
  });

  var mapNested = [1, 2, 3].map(function (i) {
    var _i6 = i;

    return _jsxWrapper(function () {
      elementOpen("outer");
      elementOpen("inner");

      _renderArbitrary(_i6);

      elementClose("inner");
      return elementClose("outer");
    });
  });

  var mapNested2 = [1, 2, 3].map(function (i) {
    var _i7 = i;

    return _jsxWrapper(function () {
      elementOpen("outer2");
      elementOpen("inner2");

      _renderArbitrary(_i7);

      elementClose("inner2");
      return elementClose("outer2");
    });
  });

  var mapNested3 = [1, 2, 3].map(function (i) {
    var _i8 = i;

    return _jsxWrapper(function () {
      elementOpen("outer3");
      elementOpen("inner3", null, null, "attr", _i8);
      elementClose("inner3");
      return elementClose("outer3");
    });
  });

  var mapNested4 = [1, 2, 3].map(function (i) {
    var _i9 = i,
        _i10 = i;

    return _jsxWrapper(function () {
      elementOpen("outer4");
      elementOpen("inner4", null, null, "attr", _jsxWrapper(function () {
        elementOpen("span", null, null, "attr", _i9);

        _renderArbitrary(_i10);

        return elementClose("span");
      }));
      elementClose("inner4");
      return elementClose("outer4");
    });
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