function render() {
  return <div>
    <div {...props}></div>
    <div {...props} />
    <div></div>
    <div>{"value"}</div>
    <div>{3}</div>
    <div>{value}</div>
  </div>;
}
