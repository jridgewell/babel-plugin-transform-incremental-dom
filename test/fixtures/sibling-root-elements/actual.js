function fn() {
  return <root />;
}

function render() {
  function fn1() {
    return <div />;
  }

  function fn2() {
    return <div></div>
  }

  return <root></root>;
}

function fn3() {
  return <root />;
}

function fn4() {
  var items = items.map((item) => {
    return <div />;
  });
  return <root />;
}
