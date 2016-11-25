var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  elementOpen("array");
  text("will be wrapped");
  return elementClose("array");
};

function render() {
  var children = [1, 2, 3, _jsxWrapper(_wrapper)];
}