function render() {
  return <ul>
  {
    true && files.map((file) => <span />)
  }
  {
    true ? files.map((file) => <span />) : 1
  }
  {
    1, (true ? files.map((file) => <span />) : 1)
  }
  {
    true && (1, files.map((file) => <span />))
  }
  {
    true ? true && files.map((file) => <span />) : 1
  }
  </ul>;
}
