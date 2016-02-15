function render() {
  var mapNested = [1, 2, 3].map(function(i) {
    return <outer><inner>{i}</inner></outer>;
  });
}