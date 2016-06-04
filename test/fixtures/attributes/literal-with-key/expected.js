var _statics = ["class", "my-class", "key", "key"];
function render() {
  elementOpen("root");
  elementOpen("div", "key", _statics);
  elementClose("div");
  return elementClose("root");
}