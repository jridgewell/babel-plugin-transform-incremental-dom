function render(condition) {
  return <root>
    {condition
      ? <div class="my-class"></div>
      : <div class="other-class"></div>
    }
  </root>;
}
