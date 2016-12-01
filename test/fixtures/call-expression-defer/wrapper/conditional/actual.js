function render() {
  function fn() {}
  function fn2() {}
  function fn3() {}
  var div = <div>
  {true ? fn2() : 'a'}
  {true ? fn2() : fn3()}
  {fn() ? fn2() : fn3()}
  {1, 2, true ? fn2() : fn3()}
  {true && (true ? fn2() : fn3())}
  {true || (true ? fn2() : fn3())}
  </div>;
  return <root>{div}</root>;
}
