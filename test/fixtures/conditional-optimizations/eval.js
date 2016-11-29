import { transform } from "babel-core";
import assert from "assert";
import plugin from "../../../src/index";

const cases = [
  [ false, false, false ],
  [ false, false, true ],
  [ false, true, false ],
  [ false, true, true ],
  [ true, false, false ],
  [ true, false, true ],
  [ true, true, false ],
  [ true, true, true ],
];
const operations = [
  ['||', '||'],
  ['||', '&&'],
  ['&&', '||'],
  ['&&', '&&'],
];
const groupings = [
  [' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', '(', ' ', ' ', ')'],
  ['(', ' ', ' ', ')', ' ', ' '],
];


let wrappers = 0;
let passes = 0;
function elementOpen() { }
function elementClose() { }
function renderArbitrary() { }
function elementVoid() { }
function jsxWrapper() {
  wrappers++;
  return 'wrapper';
}
function pass() {
  passes++;
  return 'pass';
}

function mockRequire() {
  return { renderArbitrary, jsxWrapper };
}

for (let i = 0; i < cases.length; i++) {
  const c = cases[i];
  for (let j = 0; j < c.length; j++) {
    const bool = c.slice();
    const jsx = c.slice();
    bool.splice(j, 1, 'pass()');
    jsx.splice(j, 1, '<div />');


    for (let k = 0; k < operations.length; k++) {
      const operation = operations[k];
      for (var l = 0; l < groupings.length; l++) {
        const grouping = groupings[l];

        test(bool, jsx, operation, grouping);
      }
    }
  }
}

function test(bool, jsx, operation, grouping) {
  const boolCode = `${grouping[0]}${bool[0]}${grouping[1]} ${operation[0]} ${grouping[2]}${bool[1]}${grouping[3]} ${operation[1]} ${grouping[4]}${bool[2]}${grouping[5]}`;
  const jsxCode =  `${grouping[0]}${ jsx[0]}${grouping[1]} ${operation[0]} ${grouping[2]}${ jsx[1]}${grouping[3]} ${operation[1]} ${grouping[4]}${ jsx[2]}${grouping[5]}`;

  it(jsxCode, () => {
    wrappers = 0;
    passes = 0;

    // When evaluating the case, the return value tells us:
    // If the return value is "pass"
    //   - one elementVoid call
    // If the return value is false
    //   - no elementVoid calls, maybe a wrapper call
    const expected = eval(boolCode);
    const transformed = transform(`function render() { return <div>{${jsxCode}}</div>; }; render()`, {
      plugins: [
        'transform-es2015-modules-commonjs',
        [plugin, {runtimeModuleSource: 'test'}]
      ]
    }).code;

    const require = mockRequire;
    const result = eval(transformed);

    if (expected === 'pass') {
      assert.equal(wrappers, 0, 'too many wrappers created');
    } else {
      assert.ok(wrappers <= passes, 'too many wrappers created');
    }
  });
}
