function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

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
