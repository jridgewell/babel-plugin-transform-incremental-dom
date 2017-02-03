var _incrementalDom = require("incremental-dom");

var _jsxWrapper = function _jsxWrapper(func, args) {
  return {
    __jsxDOMWrapper: true,
    func: func,
    args: args
  };
};

var _li$wrapper = function _li$wrapper() {
  (0, _incrementalDom.elementOpen)("li");
  (0, _incrementalDom.text)("x.text");
  return (0, _incrementalDom.elementClose)("li");
};

function todoItems() {
  return items.map(function (x) {
    return _jsxWrapper(_li$wrapper);
  });
}

(0, _incrementalDom.patch)(container, function () {
  todoItems();
});
