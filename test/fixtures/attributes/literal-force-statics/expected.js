function render(condition) {
  elementOpen("root");
  condition ? (elementOpen("div", "__uuid__0__", ["class", "my-class"]), elementClose("div")) : (elementOpen("div", "__uuid__1__", ["class", "other-class"]), elementClose("div"));
  return elementClose("root");
}