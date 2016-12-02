var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
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