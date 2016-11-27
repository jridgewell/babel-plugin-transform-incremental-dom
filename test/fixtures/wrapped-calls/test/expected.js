var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === "number" || type === "string" || type === "object" && child instanceof String) {
    text(child);
  } else if (type === "function" && child.__jsxDOMWrapper) {
    child();
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === "object" && String(child) === "[object Object]") {
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

var _wrapper = function _wrapper(_ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7) {
  elementOpen("div");

  _renderArbitrary(_ref);

  _renderArbitrary(_ref2);

  _renderArbitrary(_ref3);

  _renderArbitrary(_ref4);

  _renderArbitrary(_ref5);

  _renderArbitrary(_ref6);

  _renderArbitrary(render2(_ref7));

  return elementClose("div");
},
    _wrapper2 = function _wrapper2(_ref8) {
  elementOpen("em");

  _renderArbitrary(_ref8);

  return elementClose("em");
};

function renderMessage(i) {
  elementOpen("em");
  text("my message " + i);
  return elementClose("em");
}

function intermediate(i) {
  return true && _jsxWrapper(renderMessage, [i]);
}

function intermediate2(i) {
  return renderMessage(i);
}

function reference(i) {
  return true && _jsxWrapper(_wrapper2, ["my message " + i]);
}

function render() {
  var a = _jsxWrapper(renderMessage, [1]);
  var b = intermediate(1);
  var c = _jsxWrapper(intermediate2, [1]);

  elementOpen("root");

  _renderArbitrary(a);

  _renderArbitrary(b);

  _renderArbitrary(c);

  return elementClose("root");
}

render();
render2();

function render2() {
  elementOpen("root");

  _renderArbitrary(renderMessage(i++));

  _renderArbitrary(intermediate(i++));

  _renderArbitrary(intermediate2(i++));

  return elementClose("root");
}

function other() {
  var other = _jsxWrapper(_wrapper, [_jsxWrapper(render2, [i++]) || true, true || _jsxWrapper(render2, [i++]), true && _jsxWrapper(render2, [i++]), _jsxWrapper(render2, [i++]) && true, (true, _jsxWrapper(render2, [i++])), (_jsxWrapper(render2, [i++]), true), i++]);
  elementOpen("root");

  _renderArbitrary(other);

  return elementClose("root");
}

function patcher() {
  iDOM.patch(element, render2);
}