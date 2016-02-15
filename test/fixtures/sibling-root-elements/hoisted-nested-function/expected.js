var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

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