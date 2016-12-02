function render() {
  function fn() {}
  function fn2() {}
  var div = <div>
  {1, 2, fn2()}
  {1, fn(), fn2()}
  {true ? (1, 2, fn2()) : (1, 2, fn2())}
  {true && (1, fn(), fn2())}
  {true || (1, fn(), fn2())}
  </div>;
  return <root>{div}</root>;
}
