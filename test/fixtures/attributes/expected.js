var _myClass, _props$myClass, _ref;

elementOpen("div");
elementOpen("div", null, ["class", "my-class"]);
elementClose("div");
elementOpen("div", null, ["class", "my-class"]);
elementClose("div");
_myClass = myClass;
elementOpen("div", null, null, "class", _myClass);
elementClose("div");
_props$myClass = props.myClass;
elementOpen("div", null, null, "class", _props$myClass);
elementClose("div");
_ref = true ? (function _ref2 () { return elementVoid("span"); }, _ref2.__jsxDOMWrapper = true, _ref2) : (function _ref3 () { return elementVoid("span"); }, _ref3.__jsxDOMWrapper = true, _ref3);
elementOpen("div", null, null, "prop", _ref);
return elementClose("div");
