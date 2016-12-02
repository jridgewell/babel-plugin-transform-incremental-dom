function render() {
  function fn() {}
  var div = <div>
  {true && fn()}
  {true || fn()}
  {fn() || true}
  {fn() && true}
  {1, 2, true && fn()}
  {1, 2, true || fn()}
  {true ? true && fn() : true && fn()}
  {true ? true || fn() : true || fn()}
  </div>;
  return <root>{div}</root>;
}
