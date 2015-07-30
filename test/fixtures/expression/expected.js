var _renderArbitrary = function _renderArbitrary(child) {
  if (typeof child === "number" || (typeof child === "string" || child && child instanceof String)) text(child);else if (typeof child === "function" && child.__jsxDOMWrapper) child();
};

elementOpen("div");

_renderArbitrary(queries.forEach(function (query) {
  elementOpen("div", query.id, ["key", query.id]);
  return elementClose("div");
}));

_renderArbitrary(a());

_renderArbitrary(message);

_renderArbitrary(data.message);

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
