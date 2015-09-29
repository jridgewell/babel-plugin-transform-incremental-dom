function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
}

function fn() {
  return (1, elementVoid("good"));
}

var fn = function fn() {
  return (1, elementVoid("good"));
};

var fn = function fn() {
  return (1, elementVoid("good"));
};

function fn() {
  var a;
  var b = (a = _jsxWrapper(function () {
    return elementVoid("div");
  }), 1);
}
