var _div$statics = ["key", ""];
function render() {
  var _attr, _ref;

  elementOpen("div", null, null, "attr", i++);
  _attr = i++;
  elementVoid("div", _ref = i++, (_div$statics[1] = _ref, _div$statics), "attr2", _attr);
  return elementClose("div");
}