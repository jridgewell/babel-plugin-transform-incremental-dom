function render() {
  elementOpen("div");
  elementOpen("div", key, ["key", key]);
  elementClose("div");
  return elementClose("div");
}