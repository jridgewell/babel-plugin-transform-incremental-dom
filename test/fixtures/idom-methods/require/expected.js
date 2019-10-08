var _require = require('incremental-dom'),
    elementOpen = _require.elementOpen,
    elementClose = _require.elementClose,
    text = _require.text;

function render() {
  elementOpen("div");
  text("test");
  return elementClose("div");
}