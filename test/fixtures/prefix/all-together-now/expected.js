var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || type === "object" && child instanceof String) {
    IncrementalDOM.text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === "object" && String(child) === "[object Object]") {
    _forOwn(child, _renderArbitrary);
  }
};

var _flipAttr = function _flipAttr(value, name) {
  IncrementalDOM.attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _spreadAttribute = function _spreadAttribute(spread) {
  _forOwn(spread, _flipAttr);
};

function render() {
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.elementOpenStart("div");

  _spreadAttribute(props);

  IncrementalDOM.elementOpenEnd("div");
  IncrementalDOM.elementClose("div");
  IncrementalDOM.elementOpenStart("div");

  _spreadAttribute(props);

  IncrementalDOM.elementOpenEnd("div");
  IncrementalDOM.elementClose("div");
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.elementClose("div");
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.text("value");
  IncrementalDOM.elementClose("div");
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.text("3");
  IncrementalDOM.elementClose("div");
  IncrementalDOM.elementOpen("div");

  _renderArbitrary(value);

  IncrementalDOM.elementClose("div");
  return IncrementalDOM.elementClose("div");
}