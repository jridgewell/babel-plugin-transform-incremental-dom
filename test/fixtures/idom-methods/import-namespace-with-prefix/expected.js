var _incrementalDom = require("incremental-dom");

var iDOM = _interopRequireWildcard(_incrementalDom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function render() {
  iDOM.elementOpen("div");
  iDOM.text("test");
  return iDOM.elementClose("div");
}