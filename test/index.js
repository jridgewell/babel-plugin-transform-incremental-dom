const path   = require("path");
const fs     = require("fs");
const assert = require("assert");
const babel  = require("babel");
const plugin = require("../src/index");

function trim(str) {
  return str.replace(/^\s+|\s+$/, "");
}

describe("turn jsx into incremental-dom", () => {
  const fixturesDir = path.join(__dirname, "fixtures");

  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split("-").join(" ")}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const expected = trim(fs.readFileSync(path.join(fixtureDir, "expected.js")).toString());
      let actual;
      let error;

      try {
        actual = babel.transformFileSync(
          path.join(fixtureDir, "actual.js"), {
            blacklist: ['strict', 'react'],
            plugins: [plugin]
          }
        ).code;
      } catch (e) {
        error = e;
      }

      if (error) {
        assert(RegExp(`${expected}$`).test(error.message), `Error "${error.message}" did not contain expected text "${expected}"`);
      } else {
        assert.equal(trim(actual), expected);
      }
    });
  });
});
