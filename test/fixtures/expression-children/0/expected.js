function render() {
  var children = [1, 2, 3, (elementOpen("array"), text("will be wrapped"), elementClose("array"))];
}