var _div$statics = ["class", "my-class", "key", "key"];
function render() {
  elementOpen("root");
  elementOpen("div", "key", _div$statics);
  elementClose("div");
  return elementClose("root");
}