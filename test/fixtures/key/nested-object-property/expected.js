function render() {
  elementOpen("div");
  elementOpen("div", props.key, ["key", props.key]);
  elementClose("div");
  return elementClose("div");
}