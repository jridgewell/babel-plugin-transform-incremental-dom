function render() {
  elementOpen("div");
  iDOM.renderArbitrary(test);
  return elementClose("div");
}