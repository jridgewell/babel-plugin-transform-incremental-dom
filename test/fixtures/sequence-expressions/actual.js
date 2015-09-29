function fn() {
  return (1, <good />);
}

var fn = () => (1, <good />);

var fn = () => {
  return (1, <good />);
};

function fn() {
  var a;
  var b = (a = <div />, 1);
}
