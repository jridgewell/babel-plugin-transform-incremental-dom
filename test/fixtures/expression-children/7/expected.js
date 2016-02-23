var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

function render() {
  var declarator = _jsxWrapper(function () {
    elementOpen("div");
    text("will be wrapped");
    return elementClose("div");
  });
}