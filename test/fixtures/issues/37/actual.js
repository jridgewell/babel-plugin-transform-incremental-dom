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

function renderMain2() {
  return <div id="app">
    {renderInput()}
  </div>;
}


// - - - - - - -

function renderMain3(flag) {
  if (flag) {
    return <div id="app"></div>;
  }
  return <div id="app">
    {renderInput()}
  </div>;
}
