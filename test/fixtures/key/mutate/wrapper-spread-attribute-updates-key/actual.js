function render() {
  var div = <div attr={i++}>
    <div spread={obj} key={obj.i++} />
  </div>;
  return <root>{div}</root>;
}
