var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (_hasOwn.call(spread, prop)) attr(prop, spread[prop]);
  }
};

var _test$wrapper = function _test$wrapper(_props) {
  elementOpenStart("div");

  _spreadAttribute(_props);

  elementOpenEnd("div");
  return elementClose("div");
};

function render() {
  var test = _jsxWrapper(_test$wrapper, [props()]);
  elementOpenStart("div");

  _spreadAttribute(props());

  elementOpenEnd("div");
  return elementClose("div");
}