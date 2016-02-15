var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function render() {
  elementOpen("root");
  elementOpen("div", null, null, "prop", x ? _jsxWrapper(function () {
    return elementVoid("span");
  }) : _jsxWrapper(function () {
    return elementVoid("span");
  }));
  elementClose("div");
  return elementClose("root");
}