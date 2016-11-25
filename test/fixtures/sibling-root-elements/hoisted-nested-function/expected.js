var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  return elementVoid("div");
};

function fn5() {
  var a = inner();
  elementOpen("root");
  return elementClose("root");

  function inner() {
    return _jsxWrapper(_wrapper);
  }
}