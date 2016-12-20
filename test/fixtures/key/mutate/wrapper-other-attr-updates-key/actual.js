function render() {
  var div = <div attr={i++}>
    <div attr2={i++} key={i++} />
  </div>;
  return <root>{div}</root>;
}
