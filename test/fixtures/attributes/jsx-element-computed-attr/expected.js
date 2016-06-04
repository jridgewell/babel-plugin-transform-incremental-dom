var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper(_ref) {
  return elementVoid("span", null, null, "attr", _ref);
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", _jsxWrapper(_wrapper, [i++]));
  elementClose("div");
  return elementClose("root");
}