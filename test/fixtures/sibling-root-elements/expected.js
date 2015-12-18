var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  return elementVoid("div");
},
    _wrapper2 = function _wrapper2() {
  elementOpen("div");
  return elementClose("div");
},
    _wrapper3 = function _wrapper3() {
  return elementVoid("div");
},
    _wrapper4 = function _wrapper4() {
  return elementVoid("div");
};

function fn() {
  return elementVoid("root");
}

function render() {
  function fn1() {
    return _jsxWrapper(_wrapper);
  }

  function fn2() {
    return _jsxWrapper(_wrapper2);
  }

  elementOpen("root");
  return elementClose("root");
}

function fn3() {
  return elementVoid("root");
}

function fn4() {
  var items = items.map(function (item) {
    return _jsxWrapper(_wrapper3);
  });
  return elementVoid("root");
}

function fn5() {
  var a = inner();
  elementOpen("root");
  return elementClose("root");

  function inner() {
    return _jsxWrapper(_wrapper4);
  }
}