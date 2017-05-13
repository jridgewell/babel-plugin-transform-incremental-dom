var _iDOM = require("iDOM");

function render() {
  var _props;

  elementOpenStart("div");
  (0, _iDOM.spreadAttribute)(_props = props);
  elementOpenEnd("div");
  (0, _iDOM.renderArbitrary)((0, _iDOM.hasOwn)(_props, "children") ? _props.children : undefined);
  return elementClose("div");
}