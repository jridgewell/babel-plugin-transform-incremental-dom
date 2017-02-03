var _div$statics = ["key", ""],
    _div$statics2 = ["key", ""],
    _div$statics3 = ["key", ""],
    _div$statics4 = ["key", ""];
function render() {
  var _attr, _div$key;

  _attr = i;
  return elementVoid("div", _div$key = i++, (_div$statics[1] = _div$key, _div$statics), "attr", _attr);
}

function render() {
  var _div$key2;

  return elementVoid("div", _div$key2 = i++, (_div$statics2[1] = _div$key2, _div$statics2), "attr", i);
}

function render() {
  var _attr2;

  _attr2 = i++;
  return elementVoid("div", i, (_div$statics3[1] = i, _div$statics3), "attr", _attr2);
}

function render() {
  return elementVoid("div", i, (_div$statics4[1] = i, _div$statics4), "attr", i++);
}