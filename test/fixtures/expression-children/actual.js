var children = [1, 2, 3, <array>will be wrapped</array>];

var map = [1, 2, 3].map(function(i) {
  return <map>{i}</map>;
});

var map2 = function() {
  [1, 2, 3].map(function(i) {
    return <map2>{i}</map2>;
  });
}

var each = [1, 2, 3].forEach(function(i) {
  <each>{i}</each>;
});


<div>Will Be Removed</div>

var declarator = (<div>will be wrapped</div>);

var assignment;
assignment = (<div>will be wrapped</div>);

return <fin>
  {children}
  {<span>won't be wrapped</span>}
</fin>;
