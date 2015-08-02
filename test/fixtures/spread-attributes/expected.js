function _attr(value, name) {
  attr(name, value);
}

var _hasOwn = Object.prototype.hasOwnProperty;

function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

elementOpenStart("div", "test", ["class", "test", "key", "test"]);
attr("id", id);

_forOwn(props, _attr);

attr("data-expanded", expanded);

_forOwn(props.attrs, _attr);

elementOpenEnd("div");
elementOpenStart("div");

_forOwn(props, _attr);

elementOpenEnd("div");
elementClose("div");
return elementClose("div");
