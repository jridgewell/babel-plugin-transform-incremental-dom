var _hasOwn = Object.prototype.hasOwnProperty;

var _spreadAttribute = function _spreadAttribute(spread) {
  for (var prop in spread) {
    if (prop !== "children" && _hasOwn.call(spread, prop)) attr(prop, spread[prop]);
  }
};

function render() {
  elementOpenStart("div");

  _spreadAttribute({ children: [1, 2, 3] });

  elementOpenEnd("div");
  elementVoid("div");
  return elementClose("div");
}