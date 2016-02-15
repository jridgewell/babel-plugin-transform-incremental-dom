function test(props) {
  props.key = 1;
  return <div id="id" key={props.key} />;
}