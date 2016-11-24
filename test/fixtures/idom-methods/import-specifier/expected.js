var _incrementalDom = require("incremental-dom");

function scope() {
  var eo = other;
  var elementClose = other;
  function render() {
    (0, _incrementalDom.elementOpen)("div");
    (0, _incrementalDom.text)("test");
    return (0, _incrementalDom.elementClose)("div");
  }
}
