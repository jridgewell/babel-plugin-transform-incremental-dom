function getDiv() {
  return <div>Bottom</div>;
}

function render() {
  return <div>
  {true ?
    <div>
      <div>Top</div>
      {getDiv()}
    </div> :
    <other />
  }
  {<div /> ? 1 : 2}
  </div>;
}
