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

function render() {
  var children = [1, 2, 3, _jsxWrapper(function () {
    elementOpen("array");
    text("will be wrapped");
    return elementClose("array");
  })];

  var items = [];
  for (var i = 0; i < 10; i++) {
    items.push(_jsxWrapper(function (_i) {
      elementOpen("div");

      _renderArbitrary(_i);

      return elementClose("div");
    }, [i]));
  }

  for (var i = 0; i < 10; i++) {
    items[i] = _jsxWrapper(function (_i2) {
      elementOpen("div");

      _renderArbitrary(_i2);

      return elementClose("div");
    }, [i]);
  }

  var map = [1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i3) {
      elementOpen("map");

      _renderArbitrary(_i3);

      return elementClose("map");
    }, [i]);
  });

  var map2 = [1, 2, 3].map(function (i) {
    var el = _jsxWrapper(function (_i4) {
      elementOpen("map2");

      _renderArbitrary(_i4);

      return elementClose("map2");
    }, [i]);
    return el;
  });

  var map3 = function map3() {
    [1, 2, 3].map(function (i) {
      return _jsxWrapper(function (_i5) {
        elementOpen("map3");

        _renderArbitrary(_i5);

        return elementClose("map3");
      }, [i]);
    });
  };

  var attr = 0;
  var attrs = [1, 2, 3].map(function () {
    return _jsxWrapper(function (_ref, _ref2) {
      elementOpen("attrs", null, null, "attr", _ref);

      _renderArbitrary(_ref2);

      return elementClose("attrs");
    }, [attr++, attr++]);
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
  var one = _jsxWrapper(function (_ref3) {
    elementOpen("one");

    _renderArbitrary(_ref3);

    return elementClose("one");
  }, [i++]);
  var two = _jsxWrapper(function (_ref4) {
    elementOpen("two");

    _renderArbitrary(_ref4);

    return elementClose("two");
  }, [i++]);

  var mapNested = [1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i6) {
      elementOpen("outer");
      elementOpen("inner");

      _renderArbitrary(_i6);

      elementClose("inner");
      return elementClose("outer");
    }, [i]);
  });

  var mapNested2 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i7) {
      elementOpen("outer2");
      elementOpen("inner2");

      _renderArbitrary(_i7);

      elementClose("inner2");
      return elementClose("outer2");
    }, [i]);
  });

  var mapNested3 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i8) {
      elementOpen("outer3");
      elementOpen("inner3", null, null, "attr", _i8);
      elementClose("inner3");
      return elementClose("outer3");
    }, [i]);
  });

  var mapNested4 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i9, _i10) {
      elementOpen("outer4");
      elementOpen("inner4", null, null, "attr", _jsxWrapper(function (_i11, _i12) {
        elementOpen("span", null, null, "attr", _i11);

        _renderArbitrary(_i12);

        return elementClose("span");
      }, [_i9, _i10]));
      elementClose("inner4");
      return elementClose("outer4");
    }, [i, i]);
  });

  var mapNested5 = [1, 2, 3].map(function (i) {
    return _jsxWrapper(function (_i13, _ref5, _i14) {
      elementOpen("outer5");
      elementOpen("inner5", null, null, "attr", _jsxWrapper(function (_i15, _ref6, _i16) {
        elementOpen("span", null, null, "attr", _i15);

        _renderArbitrary(_ref6);

        _renderArbitrary(_i16);

        return elementClose("span");
      }, [_i13, _ref5, _i14]));
      elementClose("inner5");
      return elementClose("outer5");
    }, [i, i++, i]);
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