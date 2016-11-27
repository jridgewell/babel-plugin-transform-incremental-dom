function message(txt) {
  return <span>{txt}</span>;
}
function renderMessage(i, msg) {
  return <em>{msg} {i}</em>;
}

function render() {
  return (
    <ul>
    {
      [0, 1, 2, 3, 4].map(
        i => <li>{renderMessage(i, renderMessage("hello", i + 1))}</li>,
        i => <li>{renderMessage(i, message("hello"))}</li>,
      )
    }
    </ul>
  );
}
