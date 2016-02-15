function render() {
  return <fin>
    {children}
    {<span>won't be wrapped</span>}
    <div>{one}<br />{two}<br />{two}</div>
  </fin>;
}
