var _span$statics = ["key", "123", "class", "test"],
    _a$statics = ["href", "/test"],
    _div$statics = ["id", "test"];
function render() {
  elementOpen("div", "uuid-2", _div$statics);
  elementOpen("a", "uuid-1", _a$statics);
  elementOpen("span", "123", _span$statics);
  text("test");
  elementClose("span");
  elementClose("a");
  return elementClose("div");
}