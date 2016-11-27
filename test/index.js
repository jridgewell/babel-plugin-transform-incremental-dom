import path   from "path";
import fs     from "fs";
import assert from "assert";
import { transformFileSync } from "babel-core";
import plugin from "../src/index";

function resolve(path) {
  let expected = "";
  try {
    expected = fs.readFileSync(path).toString();
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  return expected;
}

function transform(path, options) {
  return transformFileSync(path, {
    plugins: [[plugin, options]]
  }).code;
}

function parse(json) {
  return json ? JSON.parse(json) : {};
}

function trim(str) {
  return str.replace(/^\s+|\s+$/, "");
}

function stripUseStrict(str) {
  return str.replace(/^"use strict";\n+/, "");
}

function uuidReplacer(str) {
  const UUIDv4 = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/g;
  const matches = str.match(UUIDv4);
  if (!matches) {
    return str;
  }
  return matches.reduce(function(str, uuid, i) {
    return str.replace(new RegExp(uuid, 'g'), `__uuid__${i}__`);
  }, str);
}

function test(dir) {
  const expected = resolve(path.join(dir, "expected.js"));
  const opts = parse(resolve(path.join(dir, "options.json")));
  const throwMsg = opts.throws;
  const { options } = opts;
  let actual;

  try {
    actual = transform(path.join(dir, "actual.js"), options);
  } catch (err) {
    if (throwMsg) {
      if (err.message.indexOf(throwMsg) >= 0) {
        return;
      } else {
        err.message = "Expected error message: " + throwMsg + ". Got error message: " + err.message;
      }
    }

    throw err;
  }

  if (throwMsg) {
    throw new Error("Expected error message: " + throwMsg + ". But parsing succeeded.");
  }

  actual = uuidReplacer(stripUseStrict(trim(actual)));
  if (expected) {
    assert.equal(actual, trim(expected));
  } else {
    fs.writeFileSync(path.join(dir, "expected.js"), actual);
  }
}

function findTests(root) {
  const files = fs.readdirSync(root);
  if (files.indexOf("eval.js") > -1) {
    require(path.join(root, "eval.js"));
  } else if (files.indexOf("actual.js") > -1) {
    it(path.basename(root), () => test(root));
  } else {
    files.forEach((file) => {
      const filePath = path.join(root, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        if (resolve(path.join(filePath, "actual.js"))) {
          findTests(filePath);
        } else {
          const name = path.basename(file).replace(/-/g, " ");
          return describe(name, () => findTests(filePath));
        }
      }
    });
  }
}

findTests(path.join(__dirname, "fixtures"));
