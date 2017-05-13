var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (_hasOwn.call(spread, prop)) attr(prop, spread[prop]);
  }
};

function render() {
  elementOpenStart("div");

  _spreadAttribute(props);

  elementOpenEnd("div");
  return elementClose("div");
}