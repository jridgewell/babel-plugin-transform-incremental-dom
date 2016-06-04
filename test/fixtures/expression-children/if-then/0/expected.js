function check(count) {
  return count > 5;
}

function render(data) {
  elementOpen("root");
  true && check(data.count) && elementVoid("WowSoMany");
  return elementClose("root");
}