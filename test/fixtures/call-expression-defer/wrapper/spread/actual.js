function render() {
  function fn() {}
  var div = <div>
  {fn(...args)}
  {fn(1, ...args)}
  {fn.test(...args)}
  </div>;
  return <root>{div}</root>;
}
