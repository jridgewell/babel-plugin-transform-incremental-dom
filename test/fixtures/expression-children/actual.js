var children = [1, 2, 3, <span>will be wrapped</span>];

<div>Will Be Removed</div>

var declarator = (<div>will be wrapped</div>);

var assignment;
assignment = (<div>will be wrapped</div>);

return (<div>
  {children}
  {<span>won't be wrapped</span>}
</div>);
