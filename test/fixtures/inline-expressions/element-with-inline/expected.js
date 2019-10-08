var _div$statics = ["key", ""];

function render(id) {
  var key = id;
  var _key = key;
  elementOpen("root");
  _div$statics[1] = _key;
  elementVoid("div", _key, _div$statics);
  return elementClose("root");
}