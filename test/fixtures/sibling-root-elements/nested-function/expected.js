var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _div$wrapper = function _div$wrapper() {
  return elementVoid("div");
},
    _div$wrapper2 = function _div$wrapper2() {
  elementOpen("div");
  return elementClose("div");
};

function render() {
  function fn1() {
    return _jsxWrapper(_div$wrapper);
  }
  function fn2() {
    return _jsxWrapper(_div$wrapper2);
  }
  elementOpen("root");
  return elementClose("root");
}