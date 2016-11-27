function renderMessage(i) {
  return <em>{"my message " + i}</em>;
}

function intermediate(i) {
  return renderMessage(i);
}

function render() {
  var a = renderMessage(1);
  var b = intermediate(1);
  var c = renderMessage2(1);

  return <root>{a}{b}{c}</root>;
}

function renderMessage2(i) {
  return <em>{"my message " + i}</em>;
}
