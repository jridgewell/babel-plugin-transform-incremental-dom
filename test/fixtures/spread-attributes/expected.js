"use strict";

elementOpenStart("div", "test", ["class", "test", "key", "test"]);
attr("id", id);

for (var _attr in props) attr(_attr, props[_attr]);

attr("data-expanded", expanded);

for (var _attr2 in props.attrs) attr(_attr2, props.attrs[_attr2]);

elementOpenEnd("div");
elementClose("div");
