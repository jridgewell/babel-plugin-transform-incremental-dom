function render() {
  var i = 0;
  var _ref = i++,
      _ref2 = i++;
  elementOpen("root", null, null, "attr", i++);
  elementVoid("div", null, null, "attr", _ref, "other", _ref2);
  return elementClose("root");
}