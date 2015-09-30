var _statics11 = ["id", "id"];
var _statics10 = ["id", "id"];
var _statics9 = ["id", "id"];
var _statics8 = ["id", "id", "key", undefined];

function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

var _statics7 = ["id", "id", "key", undefined];
var _statics6 = ["id", "id", "key", undefined];
var _statics5 = ["id", "id", "other", "value", "another", "test", "key", undefined];
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

function fn4(key4) {
  _statics5[7] = key4;
  return elementVoid("div", key4, _statics5);
}

var fn5 = function fn5(key5) {
  _statics6[3] = key5;
  return elementVoid("div", key5, _statics6);
};

var fn6 = function fn6(key6) {
  _statics7[3] = key6;
  return elementVoid("div", key6, _statics7);
};

function fn7(items) {
  var els = [];

  var _loop = function () {
    var _i = i;

    els.push(_jsxWrapper(function () {
      return elementVoid("div", _i, ["id", "id", "key", _i]);
    }));
  };

  for (var i = 0; i < items.length; i++) {
    _loop();
  }
  return els;
}

function fn7(items) {
  return items.map(function (el, i) {
    _statics8[3] = i;
    return elementVoid("div", i, _statics8);
  });
}

function fn7(items) {
  items = items.map(function (el, i) {
    var _i2 = i;

    return _jsxWrapper(function () {
      return elementVoid("div", _i2, ["id", "id", "key", _i2]);
    });
  });
  return elementVoid("root");
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(_jsxWrapper(function () {
      return elementVoid("div", null, _statics9);
    }));
  }
  return els;
}

function fn7(items) {
  return items.map(function (el, i) {
    return elementVoid("div", null, _statics10);
  });
}

function fn7(items) {
  items = items.map(function (el, i) {
    return _jsxWrapper(function () {
      return elementVoid("div", null, _statics11);
    });
  });
  return elementVoid("root");
}