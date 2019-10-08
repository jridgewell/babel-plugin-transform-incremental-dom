var _div$statics = ["id", "id", "key", ""];

function fn7(items) {
  return items.map(function (el, i) {
    _div$statics[3] = i;
    return elementVoid("div", i, _div$statics);
  });
}