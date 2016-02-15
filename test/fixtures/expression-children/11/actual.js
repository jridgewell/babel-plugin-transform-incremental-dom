function render() {
  var mapNested2 = [1, 2, 3].map(function(i) {
    return <outer2>{<inner2>{i}</inner2>}</outer2>;
  });
}