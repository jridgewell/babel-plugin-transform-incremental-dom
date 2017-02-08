var _div$statics = ["id", "id", "key", ""],
    _div$statics2 = ["id", "id", "key", ""];
function nest() {
  _div$statics2[3] = key;
  elementOpen("div", key, _div$statics2);
  _div$statics[3] = key;
  elementVoid("div", key, _div$statics);
  return elementClose("div");
}