function render() {
  var mapNested5 = [1, 2, 3].map(function(i) {
    return <outer5>{<inner5 attr={<span attr={i}>{i++}{i}</span>}></inner5>}</outer5>;
  });
}