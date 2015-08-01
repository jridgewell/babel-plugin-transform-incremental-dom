var _key, _props$key;

elementOpen("div");
elementOpen("div", "1", ["key", "1"]);
elementClose("div");
_key = key;
elementOpen("div", _key, ["key", _key]);
elementClose("div");
_props$key = props.key;
elementOpen("div", _props$key, ["key", _props$key]);
elementClose("div");
return elementClose("div");
