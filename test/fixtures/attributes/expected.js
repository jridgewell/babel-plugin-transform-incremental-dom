var _myClass, _props$myClass, _ref3;

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
_ref3 = x ? (function _ref() {
  return elementVoid("span");
}, _ref.__jsxDOMWrapper = true, _ref) : (function _ref2() {
  return elementVoid("span");
}, _ref2.__jsxDOMWrapper = true, _ref2);
elementOpen("div", null, null, "prop", _ref3);
elementClose("div");
return elementClose("div");
