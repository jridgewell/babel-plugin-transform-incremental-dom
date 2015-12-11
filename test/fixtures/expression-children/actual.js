function render() {
  var children = [1, 2, 3, <array>will be wrapped</array>];

  var items = [];
  for (var i = 0; i < 10; i++) {
    items.push(<div>{i}</div>);
  }

  for (var i = 0; i < 10; i++) {
    items[i] = <div>{i}</div>;
  }

  var map = [1, 2, 3].map(function(i) {
    return <map>{i}</map>;
  });

  var map2 = [1, 2, 3].map(function(i) {
    var el = <map2>{i}</map2>;
    return el;
  });

  var map3 = function() {
    [1, 2, 3].map(function(i) {
      return <map3>{i}</map3>;
    });
  }

  var attr = 0;
  var attrs = [1, 2, 3].map(function() {
    return <attrs attr={attr++}>{attr++}</attrs>;
  });

  var declarator = (<div>will be wrapped</div>);

  var assignment;
  assignment = (<div>will be wrapped</div>);

  var i = 1;
  var one = <one>{i++}</one>;
  var two = <two>{i++}</two>;

  var mapNested = [1, 2, 3].map(function(i) {
    return (<outer><inner>{i}</inner></outer>);
  });

  var mapNested2 = [1, 2, 3].map(function(i) {
    return (<outer2>{<inner2>{i}</inner2>}</outer2>);
  });

  var mapNested3 = [1, 2, 3].map(function(i) {
    return (<outer3><inner3 attr={i}></inner3></outer3>);
  });

  var mapNested4 = [1, 2, 3].map(function(i) {
    return (<outer4>{<inner4 attr={<span attr={i}>{i}</span>}></inner4>}</outer4>);
  });

  return <fin>
    {children}
    {<span>won't be wrapped</span>}
    <div>{one}<br />{two}<br />{two}</div>
  </fin>;
}
