function render() {
  return items.map(function (item) {
    elementOpen("div");
    return elementClose("div");
  });
}