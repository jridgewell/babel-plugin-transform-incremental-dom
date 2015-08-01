var _hasOwn = Object.prototype.hasOwnProperty;

function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || (type === "string" || child && child instanceof String)) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else {
    _forOwn(child, _renderArbitrary);
  }
}

elementOpen("div");

_renderArbitrary(queries.forEach(function (query) {
  elementOpen("div", query.id, ["key", query.id]);
  return elementClose("div");
}));

_renderArbitrary(a());

_renderArbitrary(message);

_renderArbitrary(data.message);

text("text");
text(123);
elementOpen("div");

_renderArbitrary(a());

elementClose("div");
elementOpen("div");

_renderArbitrary(message);

elementClose("div");
elementOpen("div");

_renderArbitrary(data.message);

elementClose("div");
return elementClose("div");
