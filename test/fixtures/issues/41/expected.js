function renderMain() {
  elementOpen("p");
  text("before ");
  elementOpen("span");
  text(" middle ");
  elementClose("span");
  text(" after.");
  return elementClose("p");
}
