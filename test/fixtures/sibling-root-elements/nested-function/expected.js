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
};

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