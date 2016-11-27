function renderMany(count) {
  return <WowSoMany />;
}

function render(data) {
  return <root>
    {data.count > 5 && renderMany(data.count)}
    {data.count > 5 && renderMany(data.count) && 1}
    {data.count > 5 && <WowSoMany />}
  </root>;
}
