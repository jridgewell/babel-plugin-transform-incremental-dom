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
  var _ref;

  elementOpenStart("div", _ref = props.key++, (_div$statics[1] = _ref, _div$statics));

  _spreadAttribute(props);

  elementOpenEnd("div");
  return elementClose("div");
}