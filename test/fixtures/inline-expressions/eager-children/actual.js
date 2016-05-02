function render() {
  var i = 0;
  var div = <div attr={i++} other={i++}/>;
  return <root attr={i++}>{div}</root>;
}
