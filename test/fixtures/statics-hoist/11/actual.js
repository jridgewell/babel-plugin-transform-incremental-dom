function fn7(items) {
  items = items.map((el, i) => {
    return <div id="id" key={i} />;
  });
  return <root />;
}