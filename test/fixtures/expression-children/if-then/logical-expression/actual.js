function getDiv() {
  return <div>Bottom</div>;
}

function render() {
  return <div>
  {true &&
    <div>
      <div>Top</div>
      {getDiv()}
    </div> ||
    <other />
  }
  </div>;
}

function render2() {
  return <div>
  { true && <div /> }
  </div>;
}
