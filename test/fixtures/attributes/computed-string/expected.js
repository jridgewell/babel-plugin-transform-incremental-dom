function render() {
  elementOpen("root");
  elementOpen("div", null, null, "class", "my-class");
  elementClose("div");
  return elementClose("root");
}