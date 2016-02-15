function render() {
  var mapNested4 = [1, 2, 3].map(function(i) {
    return <outer4>{<inner4 attr={<span attr={i}>{i}</span>}></inner4>}</outer4>;
  });
}