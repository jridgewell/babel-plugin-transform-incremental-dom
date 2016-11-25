var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
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