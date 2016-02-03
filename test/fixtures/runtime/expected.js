function render() {
  var div = iDOM.jsxWrapper(function (_props) {
    elementOpenStart("div", null, ["id", "test"]);
    iDOM.forOwn(_props, iDOM.attr);
    elementOpenEnd("div");
    elementVoid("div");
    return elementClose("div");
  }, [props]);

  elementOpen("root");
  iDOM.renderArbitrary(div);
  return elementClose("root");
}