var _div$statics = ["key", ""];
function render() {
  elementOpen("div");
  _div$statics[1] = key;
  elementOpen("div", key, _div$statics);
  elementClose("div");
  return elementClose("div");
}