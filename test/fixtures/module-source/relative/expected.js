var _idomWrapper = require("../../../../idom-wrapper");

function scope() {
  (0, _idomWrapper.elementOpen)("div");
  (0, _idomWrapper.text)("test");
  return (0, _idomWrapper.elementClose)("div");
}
