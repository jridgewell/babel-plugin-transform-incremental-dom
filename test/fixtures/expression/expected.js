elementOpen("div");
queries.forEach(function (query) {
  return (elementOpen("div", query.id, ["key", query.id]), elementClose("div"));
});
elementClose("div");
