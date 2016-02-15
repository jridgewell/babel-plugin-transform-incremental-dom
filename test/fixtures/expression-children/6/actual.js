function render() {
  var attr = 0;
  var attrs = [1, 2, 3].map(function() {
    return <attrs attr={attr++}>{attr++}</attrs>;
  });
}