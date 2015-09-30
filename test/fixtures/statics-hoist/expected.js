var _statics26 = ["key", "test"];
var _statics24 = ["id", "id"];
var _statics23 = ["id", "id2", "key", undefined];
var _statics22 = ["id", "id"];
var _statics21 = ["id", "id2", "key", undefined];
var _statics20 = ["id", "id"];
var _statics19 = ["id", "id2"];
var _statics18 = ["id", "id"];
var _statics17 = ["id", "id", "key", "key"];
var _statics16 = ["id", "id"];
var _statics15 = ["id", "id"];
var _statics14 = ["id", "id"];
var _statics12 = ["id", "id", "key", undefined];

function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

var _statics10 = ["id", "id", "key", undefined];
var _statics9 = ["id", "id", "key", undefined];
var _statics8 = ["id", "id", "other", "value", "another", "test", "key", undefined];
var _statics7 = ["id", "id", "key", undefined];
var _statics6 = ["id", "id", "key", undefined];
var _statics5 = ["id", "id", "key", undefined];
var _statics4 = ["id", "id", "other", "value", "key", undefined];
var _statics3 = ["id", 3];
var _statics2 = ["id", "id"];
var _statics = ["id", "id"];
var key3 = 'test';

_statics4[5] = key3;
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
    var _statics11 = ["id", "id", "key", _i];

    els.push(_jsxWrapper(function () {
      return elementVoid("div", _i, _statics11);
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
    var _statics13 = ["id", "id", "key", _i2];

    return _jsxWrapper(function () {
      return elementVoid("div", _i2, _statics13);
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
  var _statics25 = ["id", "id2", "key", _key4];

  var a = _jsxWrapper(function () {
    elementOpen("div", null, _statics24);
    elementVoid("div", _key4, _statics25);
    return elementClose("div");
  });
  return elementVoid("root");
}

function test() {
  return elementVoid("div", "test", _statics26);
}