function render() {
  var i = 0;

  var _attr = i++,
      _other = i++;

  elementOpen("root", null, null, "attr", i++);
  elementVoid("div", null, null, "attr", _attr, "other", _other);
  return elementClose("root");
}