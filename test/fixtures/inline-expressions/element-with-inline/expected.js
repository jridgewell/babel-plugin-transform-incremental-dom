function render(id) {
  elementOpen("root");
  elementVoid("div", id, ["key", id]);
  return elementClose("root");
}