function render() {
  return <div attr={i} key={i++} />;
}

function render2() {
  return <div key={i++} attr={i} />;
}

function render3() {
  return <div attr={i++} key={i} />;
}

function render4() {
  return <div key={i} attr={i++} />;
}
