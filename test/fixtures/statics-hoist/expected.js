var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

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
    _statics11 = ["id", "id", "key", ""],
    _statics12 = ["id", "id", "key", ""],
    _statics13 = ["id", "id"],
    _wrapper = function _wrapper(i) {
  return elementVoid("div", i, _statics13, "key", i);
},
    _statics14 = ["id", "id"],
    _statics15 = ["id", "id"],
    _statics16 = ["id", "id"],
    _wrapper2 = function _wrapper2() {
  return elementVoid("div", null, _statics16);
},
    _statics17 = ["id", "id", "key", "key"],
    _statics18 = ["id", "id2"],
    _statics19 = ["id", "id"],
    _statics20 = ["id", "id2", "key", ""],
    _statics21 = ["id", "id"],
    _statics22 = ["id", "id2", "key", ""],
    _statics23 = ["id", "id"],
    _statics24 = ["id", "id2", "key", ""],
    _statics25 = ["id", "id"],
    _wrapper3 = function _wrapper3(key4) {
  elementOpen("div", null, _statics25);
  elementVoid("div", key4, (_statics24[3] = key4, _statics24));
  return elementClose("div");
},
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
  return elementVoid("div", key3, (_statics4[5] = key3, _statics4));
}

function fn3o() {
  return elementVoid("div", key4, (_statics5[3] = key4, _statics5));
}

var fn3o = function fn3o() {
  return elementVoid("div", key4, (_statics6[3] = key4, _statics6));
};

var fn3o = function fn3o() {
  return elementVoid("div", key4, (_statics7[3] = key4, _statics7));
};

function fn4(key4) {
  return elementVoid("div", key4, (_statics8[7] = key4, _statics8));
}

var fn5 = function fn5(key5) {
  return elementVoid("div", key5, (_statics9[3] = key5, _statics9));
};

var fn6 = function fn6(key6) {
  return elementVoid("div", key6, (_statics10[3] = key6, _statics10));
};

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(elementVoid("div", i, (_statics11[3] = i, _statics11)));
  }
  return els;
}

function fn7(items) {
  return items.map(function (el, i) {
    return elementVoid("div", i, (_statics12[3] = i, _statics12));
  });
}

function fn7(items) {
  items = items.map(function (el, i) {
    return _jsxWrapper(_wrapper, [i]);
  });
  return elementVoid("root");
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(elementVoid("div", null, _statics14));
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
    return _jsxWrapper(_wrapper2);
  });
  return elementVoid("root");
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(elementVoid("div", "key", _statics17));
  }
  return els;
}

function fn8() {
  elementOpen("div", null, _statics19);
  elementVoid("div", null, _statics18);
  return elementClose("div");
}

function fn8() {
  elementOpen("div", null, _statics21);
  elementVoid("div", key4, (_statics20[3] = key4, _statics20));
  return elementClose("div");
}

function fn8(key4) {
  elementOpen("div", null, _statics23);
  elementVoid("div", key4, (_statics22[3] = key4, _statics22));
  return elementClose("div");
}

function fn8(key4) {
  var a = _jsxWrapper(_wrapper3, [key4]);
  return elementVoid("root");
}

function test() {
  return elementVoid("div", "test", _statics26);
}

var test = function test(key) {
  return 1, elementVoid("div", key, (_statics27[3] = key, _statics27));
};

var key;

var test = function test(k) {
  return key = k;
};

key = 2;

function test() {
  return elementVoid("div", key, (_statics28[3] = key, _statics28));
}

function test() {
  return elementVoid("div", props.key, (_statics29[3] = props.key, _statics29));
}

function test(props) {
  return elementVoid("div", props.key, (_statics30[3] = props.key, _statics30));
}

function test(props) {
  props.key = 1;
  return elementVoid("div", props.key, (_statics31[3] = props.key, _statics31));
}

function test(key) {
  key = 1;
  return elementVoid("div", key, (_statics32[3] = key, _statics32));
}

function test() {
  var key = 'test';
  key = 1;
  return elementVoid("div", key, (_statics33[3] = key, _statics33));
}

var test = function test(key) {
  return key = 2, elementVoid("div", key, (_statics34[3] = key, _statics34));
};

function fn3o() {
  return elementVoid("div", "", _statics35);
}

function nest() {
  elementOpen("div", key, (_statics37[3] = key, _statics37));
  elementVoid("div", key, (_statics36[3] = key, _statics36));
  return elementClose("div");
}