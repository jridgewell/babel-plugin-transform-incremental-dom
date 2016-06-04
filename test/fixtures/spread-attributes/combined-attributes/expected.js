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

function render() {
  elementOpenStart("div", "test", ["class", "test", "key", "test"]);
  attr("id", id);

  _spreadAttribute(props);

  attr("data-expanded", expanded);

  _spreadAttribute(props.attrs);

  elementOpenEnd("div");
  return elementClose("div");
}