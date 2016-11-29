var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _wrapper = function _wrapper() {
  return elementVoid("span");
},
    _wrapper2 = function _wrapper2() {
  return elementVoid("span");
},
    _wrapper3 = function _wrapper3() {
  return elementVoid("span");
},
    _wrapper4 = function _wrapper4() {
  return elementVoid("span");
};

function render() {
  elementOpen("ul");
  files.map(function (file) {
    return _jsxWrapper(_wrapper);
  });
  files.map(function (file) {
    return _jsxWrapper(_wrapper2);
  });
  files.map(function (file) {
    return elementVoid("span");
  });
  null;
  files.map(function (file) {
    return elementVoid("span");
  });

  _jsxWrapper(_wrapper3);

  null;
  elementVoid("span");
  null;

  _jsxWrapper(_wrapper4);

  return elementClose("ul");
}