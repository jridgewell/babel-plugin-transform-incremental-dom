function render() {
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.text("3");
  IncrementalDOM.elementClose("div");
  return IncrementalDOM.elementClose("div");
}