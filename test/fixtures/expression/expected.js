var _a, _message, _data$message;

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

var _queries$forEach = queries.forEach(function (query) {
  var _query$id = query.id;
  elementOpen("div", _query$id, ["key", _query$id]);
  return elementClose("div");
}),
    _a2 = a(),
    _message2 = message,
    _data$message2 = data.message;

_renderArbitrary(_queries$forEach);

_renderArbitrary(_a2);

_renderArbitrary(_message2);

_renderArbitrary(_data$message2);

text("text");
text(123);
elementOpen("div");
_a = a();

_renderArbitrary(_a);

elementClose("div");
elementOpen("div");
_message = message;

_renderArbitrary(_message);

elementClose("div");
elementOpen("div");
_data$message = data.message;

_renderArbitrary(_data$message);

elementClose("div");
return elementClose("div");
