var _attr = function _attr(value, name) {
  attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _statics = ["class", "test", "key", "test"];
function render() {
  elementOpenStart("div", "test", _statics);
  attr("id", id);

  _forOwn(props, _attr);

  attr("data-expanded", expanded);

  _forOwn(props.attrs, _attr);

  elementOpenEnd("div");
  return elementClose("div");
}