var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  return elementVoid("div");
};

function render() {
  elementOpen("div");
  1;

  _jsxWrapper(_wrapper);

  text("2");
  return elementClose("div");
}