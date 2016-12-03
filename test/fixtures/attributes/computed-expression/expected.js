var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _span$wrapper = function _span$wrapper() {
  return elementVoid("span");
},
    _span$wrapper2 = function _span$wrapper2() {
  return elementVoid("span");
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", x ? _jsxWrapper(_span$wrapper) : _jsxWrapper(_span$wrapper2));
  elementClose("div");
  return elementClose("root");
}