function render() {
  var div = <div>
  {true && fn(i++)}
  {true || fn(i++)}
  </div>;
  return <root>{div}</root>;
}
