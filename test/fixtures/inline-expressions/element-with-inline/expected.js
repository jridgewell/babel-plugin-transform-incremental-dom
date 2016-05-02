function render(id) {
  var _id = id;
  elementOpen("root");
  elementVoid("div", _id, ["key", _id]);
  return elementClose("root");
}
