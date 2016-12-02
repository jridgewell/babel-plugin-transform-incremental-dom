function render() {
  function fn() {}
  var div = <div>
  {fn(args)}
  {true ? fn(args) : fn2()}
  {true ? fn() : fn2(args)}
  </div>;
  return <root>{div}</root>;
}
