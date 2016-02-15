function render() {
  elementOpen("root");
  elementOpen("div", null, null, "class", myClass);
  elementClose("div");
  return elementClose("root");
}