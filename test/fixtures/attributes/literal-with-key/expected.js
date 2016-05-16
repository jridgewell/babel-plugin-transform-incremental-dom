function render() {
  elementOpen("root");
  elementOpen("div", "key", ["class", "my-class", "key", "key"]);
  elementClose("div");
  return elementClose("root");
}
