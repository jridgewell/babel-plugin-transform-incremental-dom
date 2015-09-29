// Deep retrieves from an object
export default function get(object, path) {
  let i;
  for (i = 0; i < path.length; i++) {
    if (!object) { break; }
    object = object[path[i]];
  }

  return (i === path.length) ? object : undefined;
}
