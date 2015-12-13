var _statics = ["id", "id"],
    _statics2 = ["id", "id"],
    _statics3 = ["id", 3],
    _statics4 = ["id", "id", "other", "value", "key", ""],
    _statics5 = ["id", "id", "key", ""],
    _statics6 = ["id", "id", "key", ""],
    _statics7 = ["id", "id", "key", ""],
    _statics8 = ["id", "id", "other", "value", "another", "test", "key", ""],
    _statics9 = ["id", "id", "key", ""],
    _statics10 = ["id", "id", "key", ""],
    _statics11 = ["id", "id"],
    _statics12 = ["id", "id", "key", ""],
    _statics13 = ["id", "id"],
    _statics14 = ["id", "id"],
    _statics15 = ["id", "id"],
    _statics16 = ["id", "id"],
    _statics17 = ["id", "id", "key", "key"],
    _statics18 = ["id", "id"],
    _statics19 = ["id", "id2"],
    _statics20 = ["id", "id"],
    _statics21 = ["id", "id2", "key", ""],
    _statics22 = ["id", "id"],
    _statics23 = ["id", "id2", "key", ""],
    _statics24 = ["id", "id"],
    _statics25 = ["id", "id2"],
    _statics26 = ["key", "test"],
    _statics27 = ["id", "id", "key", ""],
    _statics28 = ["id", "id", "key", ""],
    _statics29 = ["id", "id", "key", ""],
    _statics30 = ["id", "id", "key", ""],
    _statics31 = ["id", "id", "key", ""],
    _statics32 = ["id", "id", "key", ""],
    _statics33 = ["id", "id", "key", ""],
    _statics34 = ["id", "id", "key", ""],
    _statics35 = ["id", "id", "key", ""],
    _statics36 = ["id", "id", "key", ""],
    _statics37 = ["id", "id", "key", ""];

function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

var key3 = 'test';

function fn() {
  return elementVoid("div", null, _statics);
}

function fn1() {
  return elementVoid("div", null, _statics2);
}

function fn2() {
  return elementVoid("div", null, _statics3);
}

function fn3() {
  _statics4[5] = key3;
  return elementVoid("div", key3, _statics4);
}

function fn3o() {
  _statics5[3] = key4;
  return elementVoid("div", key4, _statics5);
}

var fn3o = function fn3o() {
  _statics6[3] = key4;
  return elementVoid("div", key4, _statics6);
};

var fn3o = function fn3o() {
  _statics7[3] = key4;
  return elementVoid("div", key4, _statics7);
};

function fn4(key4) {
  _statics8[7] = key4;
  return elementVoid("div", key4, _statics8);
}

var fn5 = function fn5(key5) {
  _statics9[3] = key5;
  return elementVoid("div", key5, _statics9);
};

var fn6 = function fn6(key6) {
  _statics10[3] = key6;
  return elementVoid("div", key6, _statics10);
};

function fn7(items) {
  var els = [];

  var _loop = function () {
    var _i = i;

    els.push(_jsxWrapper(function () {
      return elementVoid("div", _i, _statics11, "key", _i);
    }));
  };

  for (var i = 0; i < items.length; i++) {
    _loop();
  }
  return els;
}

function fn7(items) {
  return items.map(function (el, i) {
    _statics12[3] = i;
    return elementVoid("div", i, _statics12);
  });
}

function fn7(items) {
  items = items.map(function (el, i) {
    var _i2 = i;

    return _jsxWrapper(function () {
      return elementVoid("div", _i2, _statics13, "key", _i2);
    });
  });
  return elementVoid("root");
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(_jsxWrapper(function () {
      return elementVoid("div", null, _statics14);
    }));
  }
  return els;
}

function fn7(items) {
  return items.map(function (el, i) {
    return elementVoid("div", null, _statics15);
  });
}

function fn7(items) {
  items = items.map(function (el, i) {
    return _jsxWrapper(function () {
      return elementVoid("div", null, _statics16);
    });
  });
  return elementVoid("root");
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(_jsxWrapper(function () {
      return elementVoid("div", "key", _statics17);
    }));
  }
  return els;
}

function fn8() {
  elementOpen("div", null, _statics18);
  elementVoid("div", null, _statics19);
  return elementClose("div");
}

function fn8() {
  _statics21[3] = key4;
  elementOpen("div", null, _statics20);
  elementVoid("div", key4, _statics21);
  return elementClose("div");
}

function fn8(key4) {
  _statics23[3] = key4;
  elementOpen("div", null, _statics22);
  elementVoid("div", key4, _statics23);
  return elementClose("div");
}

function fn8(key4) {
  var _key4 = key4;

  var a = _jsxWrapper(function () {
    elementOpen("div", null, _statics24);
    elementVoid("div", _key4, _statics25, "key", _key4);
    return elementClose("div");
  });
  return elementVoid("root");
}

function test() {
  return elementVoid("div", "test", _statics26);
}

var test = function test(key) {
  return 1, (_statics27[3] = key, elementVoid("div", key, _statics27));
};

var key;

var test = function test(k) {
  return key = k;
};

key = 2;

function test() {
  _statics28[3] = key;
  return elementVoid("div", key, _statics28);
}

function test() {
  _statics29[3] = props.key;
  return elementVoid("div", props.key, _statics29);
}

function test(props) {
  _statics30[3] = props.key;
  return elementVoid("div", props.key, _statics30);
}

function test(props) {
  props.key = 1;
  _statics31[3] = props.key;
  return elementVoid("div", props.key, _statics31);
}

function test(key) {
  key = 1;
  _statics32[3] = key;
  return elementVoid("div", key, _statics32);
}

function test() {
  var key = 'test';
  key = 1;
  _statics33[3] = key;
  return elementVoid("div", key, _statics33);
}

var test = function test(key) {
  return key = 2, (_statics34[3] = key, elementVoid("div", key, _statics34));
};

function fn3o() {
  return elementVoid("div", "", _statics35);
}

function nest() {
  _statics36[3] = key;
  _statics37[3] = key;
  elementOpen("div", key, _statics36);
  elementVoid("div", key, _statics37);
  return elementClose("div");
}