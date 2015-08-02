var children = [1, 2, 3, <array>will be wrapped</array>];

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

var each = [1, 2, 3].forEach(function(i) {
  <each>{i}</each>;
});

var attr = 0;
var attrs = [1, 2, 3].map(function() {
  return <each attr={attr++}>{attr++}</each>;
});

<div>Will Be Removed</div>

var declarator = (<div>will be wrapped</div>);

var assignment;
assignment = (<div>will be wrapped</div>);

var i = 1;
var one = <span>{i++}</span>;
var two = <span>{i++}</span>;

return <fin>
  {children}
  {<span>won't be wrapped</span>}
  <div>{one}<br />{two}<br />{two}</div>
</fin>;
