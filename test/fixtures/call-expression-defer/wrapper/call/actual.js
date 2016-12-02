function render() {
  function fn() {}
  var div = <div>{fn()}</div>;
  return <root>{div}</root>;
}
