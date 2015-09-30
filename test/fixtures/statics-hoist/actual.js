var key3 = 'test';

function fn() {
  return <div id="id" />;
}

function fn1() {
  return <div id={"id"} />;
}

function fn2() {
  return <div id={3} />;
}

function fn3() {
  return <div id="id" other="value" key={key3} />;
}

function fn3o() {
  return <div id="id" key={key4} />;
}

var fn3o = () => {
  return <div id="id" key={key4} />;
}

var fn3o = () => <div id="id" key={key4} />;

function fn4(key4) {
  return <div id="id" other="value" another="test" key={key4} />;
}

var fn5 = (key5) => {
  return <div id="id" key={key5} />;
}

var fn6 = (key6) => <div id="id" key={key6} />;

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(<div id="id" key={i} />);
  }
  return els;
}

function fn7(items) {
  return items.map((el, i) => {
    return <div id="id" key={i} />;
  });
}

function fn7(items) {
  items = items.map((el, i) => {
    return <div id="id" key={i} />;
  });
  return <root />;
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(<div id="id" />);
  }
  return els;
}

function fn7(items) {
  return items.map((el, i) => {
    return <div id="id" />;
  });
}

function fn7(items) {
  items = items.map((el, i) => {
    return <div id="id" />;
  });
  return <root />;
}

function fn7(items) {
  var els = [];
  for (var i = 0; i < items.length; i++) {
    els.push(<div id="id" key="key"/>);
  }
  return els;
}

function fn8() {
  return <div id="id"><div id="id2" /></div>;
}

function fn8() {
  return <div id="id"><div id="id2" key={key4} /></div>;
}

function fn8(key4) {
  return <div id="id"><div id="id2" key={key4} /></div>;
}

function fn8(key4) {
  var a = <div id="id"><div id="id2" key={key4} /></div>;
  return <root />
}

function test() {
  return <div key="test" />;
}
