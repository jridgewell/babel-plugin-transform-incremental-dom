function render() {
  var a = { b: { fn() { } } };
  var div = <div>{a.b.fn()}</div>;
  return <root>{div}</root>;
}
