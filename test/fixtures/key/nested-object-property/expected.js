var _div$statics = ["key", ""];
function render() {
  var _div$key;

  elementOpen("div");
  _div$key = _div$statics[1] = props.key;
  elementOpen("div", _div$key, _div$statics);
  elementClose("div");
  return elementClose("div");
}