var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _span$wrapper = function _span$wrapper(_ref) {
  return elementVoid("span", null, null, "attr", _ref);
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", _jsxWrapper(_span$wrapper, [i++]));
  elementClose("div");
  return elementClose("root");
}