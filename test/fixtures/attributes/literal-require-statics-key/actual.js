function render(condition) {
  return <root>
    {condition
      ? <div class="my-class" attr={i++}></div>
      : <div attr={i++} class="other-class"></div>
    }
  </root>;
}
