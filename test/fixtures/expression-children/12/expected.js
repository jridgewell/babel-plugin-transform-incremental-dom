function render() {
  var mapNested3 = [1, 2, 3].map(function (i) {
    elementOpen("outer3");
    elementOpen("inner3", null, null, "attr", i);
    elementClose("inner3");
    return elementClose("outer3");
  });
}