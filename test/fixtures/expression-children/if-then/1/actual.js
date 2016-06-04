function renderMany(count) {
  return <WowSoMany />;
}

function render(data) {
  return <root>
    {data.count > 5 && renderMany(data.count)}
  </root>;
}
