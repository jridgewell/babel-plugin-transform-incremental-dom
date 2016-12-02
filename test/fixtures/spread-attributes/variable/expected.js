var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _flipAttr = function _flipAttr(value, name) {
  attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _spreadAttribute = function _spreadAttribute(spread) {
  _forOwn(spread, _flipAttr);
};

var _test = function _test(_props) {
  elementOpenStart("div");

  _spreadAttribute(_props);

  elementOpenEnd("div");
  return elementClose("div");
};

function render() {
  var test = _jsxWrapper(_test, [props]);
  elementOpenStart("div");

  _spreadAttribute(props);

  elementOpenEnd("div");
  return elementClose("div");
}