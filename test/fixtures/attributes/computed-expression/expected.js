var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _wrapper = function _wrapper() {
  return elementVoid("span");
},
    _wrapper2 = function _wrapper2() {
  return elementVoid("span");
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", x ? _jsxWrapper(_wrapper) : _jsxWrapper(_wrapper2));
  elementClose("div");
  return elementClose("root");
}