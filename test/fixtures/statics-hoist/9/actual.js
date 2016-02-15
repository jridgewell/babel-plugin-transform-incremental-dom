function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(<div id="id" key={i} />);
  }
  return els;
}