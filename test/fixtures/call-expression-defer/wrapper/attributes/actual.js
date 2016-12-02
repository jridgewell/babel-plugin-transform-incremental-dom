function render() {
  function fn() {}
  var div = <div attr={fn()} {...fn()}></div>;
  return <root>{div}</root>;
}
