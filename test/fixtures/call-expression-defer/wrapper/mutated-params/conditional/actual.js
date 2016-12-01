function render() {
  var div = <div>
  {true ? fn(a++) : fn2(b++, c++)}
  {fn(i++) ? fn(a++) : fn2(b++, c++)}
  </div>;
  return <root>{div}</root>;
}
