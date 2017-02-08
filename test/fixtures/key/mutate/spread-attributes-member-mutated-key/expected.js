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

var _div$statics = ["key", ""];
function render() {
  var _spread, _div$key;

  _spread = props.props;
  _div$key = _div$statics[1] = props.key++;
  elementOpenStart("div", _div$key, _div$statics);

  _spreadAttribute(_spread);

  elementOpenEnd("div");
  return elementClose("div");
}