var _attr = function _attr(value, name) {
  IncrementalDOM.attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

function render() {
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.elementOpenStart("div");

  _forOwn(props, _attr);

  IncrementalDOM.elementOpenEnd("div");
  IncrementalDOM.elementClose("div");
  return IncrementalDOM.elementClose("div");
}