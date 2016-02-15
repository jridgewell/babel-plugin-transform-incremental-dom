function render() {
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.elementOpen("div");
  IncrementalDOM.text("value");
  IncrementalDOM.elementClose("div");
  return IncrementalDOM.elementClose("div");
}