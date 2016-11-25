var _iDOM = require("iDOM");

function render() {
  elementOpen("div");
  (0, _iDOM.renderArbitrary)(test);
  return elementClose("div");
}