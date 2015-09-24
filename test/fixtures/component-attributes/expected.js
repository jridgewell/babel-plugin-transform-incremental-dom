function _attr(value, name) {
  attr(name, value);
}

function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

var _hasOwn = Object.prototype.hasOwnProperty;
elementOpenStart(Comp, "test", ["class", "myClass", "key", "test"]);
attr("id", id);

_forOwn(props, _attr);

attr("data-expanded", expanded);

_forOwn(props.attrs, _attr);

elementOpenEnd(Comp);
return elementClose(Comp);