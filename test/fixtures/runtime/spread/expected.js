function render() {
  elementOpenStart("div");
  iDOM.forOwn(props, iDOM.attr);
  elementOpenEnd("div");
  return elementClose("div");
}