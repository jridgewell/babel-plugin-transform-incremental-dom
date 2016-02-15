function render() {
  return <div>
    {
      queries.forEach(function(query) {
        return <div key={query.id}></div>;
      })
    }
  </div>;
}
