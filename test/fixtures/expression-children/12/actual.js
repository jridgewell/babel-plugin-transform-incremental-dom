function render() {
  var mapNested3 = [1, 2, 3].map(function(i) {
    return <outer3><inner3 attr={i}></inner3></outer3>;
  });
}