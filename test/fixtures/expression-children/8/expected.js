var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  elementOpen("div");
  text("will be wrapped");
  return elementClose("div");
};

function render() {
  var assignment;
  assignment = _jsxWrapper(_wrapper);
}