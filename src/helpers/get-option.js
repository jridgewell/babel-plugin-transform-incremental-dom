// Deep retrieves from an object
function get(object, path) {
  let i;
  for (i = 0; i < path.length; i++) {
    if (!object) { break; }
    object = object[path[i]];
  }

  return (i === path.length) ? object : undefined;
}

export default function getOption(file, option) {
  return get(file, ["opts", "extra", "incremental-dom", option]);
}
