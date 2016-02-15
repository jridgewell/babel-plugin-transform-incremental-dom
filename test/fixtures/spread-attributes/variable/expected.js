var _attr = function _attr(value, name) {
  attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

function render() {
  var test = ((elementOpenStart("div"), _forOwn(props, _attr), elementOpenEnd("div")), elementClose("div"));
}