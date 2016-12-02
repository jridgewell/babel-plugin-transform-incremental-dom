function render() {
  function fn() {}
  var div = <div>
  {fn(1, true, i, 'test')}
  {fn(1, a, 2, i, 'test')}
  </div>;
  return <root>{div}</root>;
}
