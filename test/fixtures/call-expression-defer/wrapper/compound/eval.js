import { transform } from "babel-core";
import assert from "assert";
import plugin from "../../../../../src/index";

const originals = [
  '(1, 2, fn())',
  '(true ? fn() : fn())',
  '(true && fn())',
  '(true || fn())',
];

let cases = [...originals];
let tests = [...cases];
for (let i = 0; i < cases.length; i++) {
  const kase = cases[i];
  for (let j = 0; j < cases.length; j++) {
    const other = cases[j];
    const compound = kase.replace(/fn\(\)/g, other);
    tests.push(compound);
  }
}

cases = tests;
tests = [...cases];
for (let i = 0; i < originals.length; i++) {
  const kase = cases[i];
  for (let j = originals.length; j < cases.length; j++) {
    const other = cases[j];
    const compound = kase.replace(/fn\(\)/g, other);
    if ((i + 1) * 4 <= j && j < (i + 2) * 4) {
      // console.log(compound);
    } else if ((j - 4) % 5 === 0) {
      // console.log(compound);
    } else {
      tests.push(compound);
    }
  }
}

cases = tests;
tests = [];
for (let i = 0; i < cases.length; i++) {
  const kase = cases[i].split('fn()');

  const perms = Math.pow(2, kase.length - 1);
  for (let j = 0; j < perms; j++) {
    const bits = j.toString(2).split('');
    while (bits.length < kase.length - 1) {
      bits.unshift("0");
    }

    let perm = kase[0];
    for (let k = 1; k < kase.length; k++) {
      perm += `${bits[k - 1] == "0" ? `"expression${k}"` : "fn()"}${kase[k]}`;
    }
    tests.push(perm)
  }
}

cases = tests;
tests = [];
for (let i = 0; i < cases.length; i++) {
  const kase = cases[i].split('true');

  const perms = Math.pow(2, kase.length - 1);
  for (let j = 0; j < perms; j++) {
    const bits = j.toString(2).split('').map((b) => b == "1");

    while (bits.length < kase.length - 1) {
      bits.unshift(false);
    }
    let perm = kase[0];
    for (let k = 1; k < kase.length; k++) {
      perm += `${bits[k - 1]}${kase[k]}`;
    }
    tests.push(perm)
  }
}

for (let i = 0; i < tests.length; i++) {
  let fn = 0;
  tests[i] = tests[i].replace(/fn\(\)/g, function() {
    fn++;
    return `fn${fn}(args[${fn - 1}]++)`;
  });
}


let val;
function elementOpen() { }
function elementClose() { }
function _renderArbitrary(v) {
  val = v;
}
function elementVoid() { }
function jsxWrapper(func, args) {
  func.apply(null, args);
}
const args = Array(4);
function fn1() {
  return `fn1${args}`;
}
function fn2() {
  return `fn2${args}`;
}
function fn3() {
  return `fn3${args}`;
}
function fn4() {
  return `fn4${args}`;
}

const runtimeModule = { renderArbitrary: _renderArbitrary, jsxWrapper };
function mockRequire() {
  return runtimeModule;
}

for (let i = 0; i < tests.length; i++) {
  const test = tests[i]

  it(test, () => {
    val = '';
    args.fill(0);

    const expected = eval(test);
    const expectedCount = args.reduce((sum, i) => sum + (i & 1));

    const transformed = transform(`function render() { var div = <div>{${test}}</div>; return <div />; }; render()`, {
      plugins: [
        'transform-es2015-modules-commonjs',
        [plugin, {runtimeModuleSource: 'test'}]
      ]
    }).code;

    args.fill(0);
    const require = mockRequire;
    eval(transformed);
    const count = args.reduce((sum, i) => sum + (i & 1));

    assert.equal(val, expected);
    assert.equal(count,expectedCount, 'arguments were eagerly evaluated');
  });
}
