function fn() {
  return items.map((item) => <div></div>);
}

function fn1() {
  return items.map((item) => {
    return <div></div>;
  });
}
