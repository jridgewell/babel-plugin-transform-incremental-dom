function render() {
  var test = <div attr={i++}>
    <div first={i++}>
      {i++}
    </div>
    {i++}
    <div second={i++}>
      {i++}
    </div>
  </div>
  return <root>{test}</root>;
}
