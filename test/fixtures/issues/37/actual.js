function renderMain() {
  const renderInput = () => (
    <div>
      <input type="text" id="testInput"/>
    </div>
  );
  return <div id="app">
    {renderInput()}
  </div>;
}

const renderInput = () => (
  <div>
  <input type="text" id="testInput"/>
  </div>
);

function renderMain() {
  return <div id="app">
    {renderInput()}
  </div>;
}
