
function renderMain() {
  function renderState({ bar }) {
    return ([
      <span
        foo={ `My bar is: ${bar}`}
      >one</span>,
      <span
        foo={ `My bar is: ${bar}`}
      >two</span>,
      <span
        foo={ `My bar is: ${bar}`}
      >three</span>
    ]);
  }

  const state = {
    bar: 'Hello World'
  };

  return renderState(state);
}
