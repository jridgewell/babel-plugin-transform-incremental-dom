var _div$statics = ["id", "id", "key", ""];

function test(props) {
  var _div$key;

  props.key = 1;
  _div$key = _div$statics[3] = props.key;
  return elementVoid("div", _div$key, _div$statics);
}