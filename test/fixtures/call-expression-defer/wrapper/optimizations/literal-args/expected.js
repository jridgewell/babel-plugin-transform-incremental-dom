'use strict';

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === 'number' || type === 'string' || type === 'object' && child instanceof String) {
    text(child);
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === 'object') {
    if (child.__jsxDOMWrapper) {
      var func = child.func,
          args = child.args;

      if (args) {
        func.apply(this, args);
      } else {
        func();
      }
    } else if (String(child) === '[object Object]') {
      _forOwn(child, _renderArbitrary);
    }
  }
};

var _div = function _div(_deferred, _args, _deferred2, _args2) {
  elementOpen('div');

  _renderArbitrary(_deferred(1, true, _args, 'test'));

  _renderArbitrary(_deferred2(1, _args2[1], 2, _args2[3], 'test'));

  return elementClose('div');
};

function render() {
  function fn() {}
  var div = _jsxWrapper(_div, [fn, i, fn, [a, i]]);
  elementOpen('root');

  _renderArbitrary(div);

  return elementClose('root');
}