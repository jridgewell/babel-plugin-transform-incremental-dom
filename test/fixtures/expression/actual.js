return (<div>
  {
    queries.forEach(function(query) {
      return (<div key={query.id}></div>);
    })
  }
  {a()}
  {message}
  {data.message}
  {"text"}
  {123}
  <div>{a()}</div>
  <div>{message}</div>
  <div>{data.message}</div>
</div>);
