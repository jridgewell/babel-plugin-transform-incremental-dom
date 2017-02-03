var _div$statics = ["key", ""];
function render() {
  var _attr, _div$key;

  elementOpen("div", null, null, "attr", i++);
  _attr = i++;
  elementVoid("div", _div$key = i++, (_div$statics[1] = _div$key, _div$statics), "attr2", _attr);
  return elementClose("div");
}