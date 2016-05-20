'use strict';

var _require = require('incremental-dom');

var elementOpen = _require.elementOpen;
var elementClose = _require.elementClose;
var text = _require.text;


function render() {
  elementOpen('div');
  text('test');
  return elementClose('div');
}