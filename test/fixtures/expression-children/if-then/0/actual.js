function check(count) {
  return count > 5;
}

function render(data) {
  return <root>
    {true && check(data.count) && <WowSoMany />}
  </root>;
}
