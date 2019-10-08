var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (_hasOwn.call(spread, prop)) attr(prop, spread[prop]);
  }
};

var _div$statics = ["class", "test", "key", "test"];

function render() {
  elementOpenStart("div", "test", _div$statics);
  attr("id", id);

  _spreadAttribute(props);

  attr("data-expanded", expanded);

  _spreadAttribute(props.attrs);

  elementOpenEnd("div");
  return elementClose("div");
}