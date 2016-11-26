function render() {
  return <ul>
  {
    files.map((file) => <span />), null
  }
  {
    files.map((file) => <span />), files.map((file) => <span />)
  }
  {
    null, files.map((file) => <span />)
  }
  {
    <span />, null
  }
  {
    null, <span />
  }
  {
    null, <span />, null
  }
  </ul>;
}
