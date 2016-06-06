function getDiv() {
  elementOpen("div");
  text("Bottom");
  return elementClose("div");
}

function render() {
  elementOpen("div");
  1;
  2;
  elementVoid("div");
  return elementClose("div");
}