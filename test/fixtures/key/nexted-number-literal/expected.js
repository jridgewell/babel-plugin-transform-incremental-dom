function render() {
  elementOpen("div");
  elementOpen("div", 1, ["key", 1]);
  elementClose("div");
  return elementClose("div");
}