var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || child && child instanceof String) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else {
    _forOwn(child, _renderArbitrary);
  }
};

var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper(_query$id) {
  elementOpen("div", _query$id, ["key", _query$id]);
  return elementClose("div");
};

function render() {
  elementOpen("div");

  _renderArbitrary(queries.forEach(function (query) {
    return _jsxWrapper(_wrapper, [query.id]);
  }));

  _renderArbitrary(a());

  _renderArbitrary(message);

  _renderArbitrary(data.message);

  text("text");
  text("123");
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
}