var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (_hasOwn.call(spread, prop)) attr(prop, spread[prop]);
  }
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