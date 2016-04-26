var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || child && child instanceof String) {
    IncrementalDOM.virtual.elements.text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (String(child) === "[object Object]") {
    _forOwn(child, _renderArbitrary);
  }
};

var _attr = function _attr(value, name) {
  IncrementalDOM.virtual.elements.attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

function render() {
  IncrementalDOM.virtual.elements.elementOpen("div");
  IncrementalDOM.virtual.elements.elementOpenStart("div");

  _forOwn(props, _attr);

  IncrementalDOM.virtual.elements.elementOpenEnd("div");
  IncrementalDOM.virtual.elements.elementClose("div");
  IncrementalDOM.virtual.elements.elementOpenStart("div");

  _forOwn(props, _attr);

  IncrementalDOM.virtual.elements.elementOpenEnd("div");
  IncrementalDOM.virtual.elements.elementClose("div");
  IncrementalDOM.virtual.elements.elementOpen("div");
  IncrementalDOM.virtual.elements.elementClose("div");
  IncrementalDOM.virtual.elements.elementOpen("div");
  IncrementalDOM.virtual.elements.text("value");
  IncrementalDOM.virtual.elements.elementClose("div");
  IncrementalDOM.virtual.elements.elementOpen("div");
  IncrementalDOM.virtual.elements.text("3");
  IncrementalDOM.virtual.elements.elementClose("div");
  IncrementalDOM.virtual.elements.elementOpen("div");

  _renderArbitrary(value);

  IncrementalDOM.virtual.elements.elementClose("div");
  return IncrementalDOM.virtual.elements.elementClose("div");
}
