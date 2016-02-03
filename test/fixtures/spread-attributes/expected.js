var _jsxWrapper = function _jsxWrapper(func, args) {
  var wrapper = args ? function wrapper() {
    return func.apply(this, args);
  } : func;
  wrapper.__jsxDOMWrapper = true;
  return wrapper;
};

var _attr = function _attr(value, name) {
  attr(name, value);
};

var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) {
    if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
  }
};

function render() {
  var test = _jsxWrapper(function (_props) {
    elementOpenStart("div");

    _forOwn(_props, _attr);

    elementOpenEnd("div");
    return elementClose("div");
  }, [props]);
  elementOpenStart("div", "test", ["class", "test", "key", "test"]);
  attr("id", id);

  _forOwn(props, _attr);

  attr("data-expanded", expanded);

  _forOwn(props.attrs, _attr);

  elementOpenEnd("div");
  elementOpenStart("div");

  _forOwn(props, _attr);

  elementOpenEnd("div");
  elementClose("div");
  return elementClose("div");
}