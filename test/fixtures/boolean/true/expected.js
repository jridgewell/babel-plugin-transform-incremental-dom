function render() {
  elementOpen("div");
  elementVoid("input", null, ["disabled", true]);
  return elementClose("div");
}