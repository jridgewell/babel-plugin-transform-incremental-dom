var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", _jsxWrapper(function (_ref) {
    return elementVoid("span", null, null, "attr", _ref);
  }, [i++]));
  elementClose("div");
  return elementClose("root");
}