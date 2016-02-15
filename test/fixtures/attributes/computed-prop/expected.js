function render() {
  elementOpen("root");
  elementOpen("div", null, null, "class", props.myClass);
  elementClose("div");
  return elementClose("root");
}