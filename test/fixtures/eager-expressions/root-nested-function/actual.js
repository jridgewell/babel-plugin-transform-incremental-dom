function render() {
  return <root>
    <div attr={i++}>
      {[1, 2, 3].map(function(i) {
        return <map>{i}</map>;
      })}
      {function() {
        <div first={i++}>
          {i++}
        </div>
      }()}
      {i++}
      <div second={i++}>
        {i++}
      </div>
    </div>
  </root>;
}
