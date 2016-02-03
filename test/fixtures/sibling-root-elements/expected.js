var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function fn() {
  return elementVoid("root");
}

function render() {
  function fn1() {
    return _jsxWrapper(function () {
      return elementVoid("div");
    });
  }

  function fn2() {
    return _jsxWrapper(function () {
      elementOpen("div");
      return elementClose("div");
    });
  }

  elementOpen("root");
  return elementClose("root");
}

function fn3() {
  return elementVoid("root");
}

function fn4() {
  var items = items.map(function (item) {
    return _jsxWrapper(function () {
      return elementVoid("div");
    });
  });
  return elementVoid("root");
}

function fn5() {
  var a = inner();
  elementOpen("root");
  return elementClose("root");

  function inner() {
    return _jsxWrapper(function () {
      return elementVoid("div");
    });
  }
}