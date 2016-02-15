function render() {
  return <root>
    <div attr={i++}>
      <div first={i++}>
        {i++}
      </div>
      {i++}
      <div second={i++}>
        {i++}
      </div>
    </div>
  </root>;
}
