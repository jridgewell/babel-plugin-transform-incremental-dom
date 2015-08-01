return (<div>
  <div class="my-class"></div>
  <div class={"my-class"}></div>
  <div class={myClass}></div>
  <div class={props.myClass}></div>
  <div prop={true ? <span /> : <span />}></div>
</div>);
