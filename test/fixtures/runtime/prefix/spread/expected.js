function render() {
  elementOpenStart("div");
  iDOM.spreadAttribute(props);
  elementOpenEnd("div");
  return elementClose("div");
}