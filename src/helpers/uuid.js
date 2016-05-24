import { randomBytes } from "crypto";

// @jed's brilliantly short UUID v4 generator
// https://gist.github.com/jed/982883
export default function uuid(){
  return "00000000-0000-4000-8000-000000000000".replace(/[08]/g, randomizer);
}

function randomizer(bit) {
  return (bit ^ randomBytes(1)[0] % 16 >> bit/4).toString(16);
}
