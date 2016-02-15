function render() {
  elementOpen("div");
  text(";");
  elementVoid("div", null, ["attr", "value"]);
  return elementClose("div");
}