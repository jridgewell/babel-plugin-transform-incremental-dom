function fn() {
  if (test) {
    return elementVoid("consequent");
  } else {
    return elementVoid("alternate");
  }
}