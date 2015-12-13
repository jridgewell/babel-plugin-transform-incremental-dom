function render() {
  var test = <div grand={i++}>
      <div parent={i++}>
        {i++}
      </div>
    </div>;
  return (<root>
    <div class="my-class"></div>
    <div class={"my-class"}></div>
    <div class={myClass}></div>
    <div class={props.myClass}></div>
    <div prop={x ? <span /> : <span />}></div>
    <div prop={<span attr={i++}/>}></div>
    <div prop={<span>{i++}</span>}></div>
  </root>);
}
