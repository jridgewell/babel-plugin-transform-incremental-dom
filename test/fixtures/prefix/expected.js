function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || (type === "string" || child && child instanceof String)) {
    IncrementalDOM.text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else {
    _forOwn(child, _renderArbitrary);
  }
}

function _attr(value, name) {
  IncrementalDOM.attr(name, value);
}

function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

var _hasOwn = Object.prototype.hasOwnProperty;
IncrementalDOM.elementOpen("div");
IncrementalDOM.elementOpenStart("div");

_forOwn(props, _attr);

IncrementalDOM.elementOpenEnd("div");
IncrementalDOM.elementClose("div");
IncrementalDOM.elementOpenStart("div");

_forOwn(props, _attr);

IncrementalDOM.elementOpenEnd("div");
IncrementalDOM.elementClose("div");
IncrementalDOM.elementOpen("div");
IncrementalDOM.elementClose("div");
IncrementalDOM.elementOpen("div");
IncrementalDOM.text("value");
IncrementalDOM.elementClose("div");
IncrementalDOM.elementOpen("div");
IncrementalDOM.text(3);
IncrementalDOM.elementClose("div");
IncrementalDOM.elementOpen("div");

_renderArbitrary(value);

IncrementalDOM.elementClose("div");
return IncrementalDOM.elementClose("div");
