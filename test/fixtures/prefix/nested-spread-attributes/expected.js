var _flipAttr = function _flipAttr(value, name) {
  IncrementalDOM.attr(name, value);
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

function render() {
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.elementOpenStart("div");

  _spreadAttribute(props);

  IncrementalDOM.elementOpenEnd("div");
  IncrementalDOM.elementClose("div");
  return IncrementalDOM.elementClose("div");
}