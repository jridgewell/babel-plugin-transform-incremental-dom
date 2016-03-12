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


// - - - - - - -

function renderMain(flag) {
  if (flag) {
    return <div id="app"></div>;
  }
  return <div id="app">
    {renderInput()}
  </div>;
}
