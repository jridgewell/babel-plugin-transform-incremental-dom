function fn() {
  return 1, elementVoid("good");
}

var fn = function fn() {
  return 1, elementVoid("good");
};

var fn = function fn() {
  return 1, elementVoid("good");
};

function fn() {
  var a;
  var b = (a = elementVoid("div"), 1);
}