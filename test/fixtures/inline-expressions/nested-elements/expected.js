function render() {
  elementOpen("root");
  elementOpen("ul");
  elementOpen("li");
  text("test");
  elementClose("li");
  elementClose("ul");
  return elementClose("root");
}