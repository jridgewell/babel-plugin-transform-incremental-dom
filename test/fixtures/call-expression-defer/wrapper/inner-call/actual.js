function renderMessage(i) {
  return <em>{"my message " + i}</em>;
}

function render() {
  var ul = <ul>
  {
    [0, 1, 2, 3, 4].map(
      i => <li>{renderMessage(i)}</li>
    )
  }
  </ul>;
  return <root>{ul}</root>;
}
