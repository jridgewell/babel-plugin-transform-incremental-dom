function renderMessage(i) {
  return <em>{"my message " + i}</em>;
}

function intermediate(i) {
  return true && renderMessage(i);
}

function intermediate2(i) {
  return renderMessage(i);
}

function reference(i) {
  return true && <em>{"my message " + i}</em>;
}

function render() {
  var a = renderMessage(1);
  var b = intermediate(1);
  var c = intermediate2(1);

  return <root>{a}{b}{c}</root>;
}

render();
render2();

function render2() {
  return <root>
  {renderMessage(i++)}
  {intermediate(i++)}
  {intermediate2(i++)}
  </root>;
}

function other() {
  var other = <div>
  {render2(i++) || true}
  {true || render2(i++)}
  {true && render2(i++)}
  {render2(i++) && true}
  {true, render2(i++)}
  {render2(i++), true}
  {render2(i++)}
  </div>;
  return <root>{other}</root>;
}

function patcher() {
  iDOM.patch(element, render2);
}
