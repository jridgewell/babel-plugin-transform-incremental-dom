'use strict';

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _span$wrapper = function _span$wrapper(_foo) {
  elementOpen('span', null, null, 'foo', _foo);
  text('one');
  return elementClose('span');
},
    _span$wrapper2 = function _span$wrapper2(_foo2) {
  elementOpen('span', null, null, 'foo', _foo2);
  text('two');
  return elementClose('span');
},
    _span$wrapper3 = function _span$wrapper3(_foo3) {
  elementOpen('span', null, null, 'foo', _foo3);
  text('three');
  return elementClose('span');
};

function renderMain() {
  function renderState(_ref) {
    var bar = _ref.bar;

    return [_jsxWrapper(_span$wrapper, ['My bar is: ' + bar]), _jsxWrapper(_span$wrapper2, ['My bar is: ' + bar]), _jsxWrapper(_span$wrapper3, ['My bar is: ' + bar])];
  }

  var state = {
    bar: 'Hello World'
  };

  return renderState(state);
}
