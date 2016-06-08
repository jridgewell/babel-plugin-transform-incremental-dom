var _jsxClosure = function _jsxClosure(func, args) {
  return function jsxClosure() {
    return func.apply(this, args);
  };
};

var _jsxWrapper = function _jsxWrapper(func) {
  func.__jsxDOMWrapper = true;
  return func;
};

var _wrapper = function _wrapper(_ref) {
  return elementVoid("span", null, null, "attr", _ref);
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", _jsxWrapper(_jsxClosure(_wrapper, [i++])));
  elementClose("div");
  return elementClose("root");
}