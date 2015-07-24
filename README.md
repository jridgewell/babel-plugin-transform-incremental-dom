# babel-plugin-incremental-dom [![Build Status](https://travis-ci.org/thejameskyle/babel-plugin-incremental-dom.svg?branch=master)](https://travis-ci.org/thejameskyle/babel-plugin-incremental-dom)

Turn jsx into [incremental-dom](http://google.github.io/incremental-dom/).

## Example

**In**

```javascript
<div>
  <h1>Hello World</h1>

  <div key="1">
    <div key={key}></div>
  </div>

  <div class="my-class">
    <div class={myClass}></div>
  </div>

  <input type="text" disabled />

  {
    queries.forEach(function(query) {
      return (<div key={query.id}></div>);
    })
  }

  <div class="myClass" id={id} {...props} key="test" data-expanded={expanded} {...props.attrs}>
  </div>
</div>
```

**Out**

```javascript
"use strict";

elementOpen("div");
  elementOpen("h1");
    text("Hello World");
  elementClose("h1");

  elementOpen("div", "1", ["key", "1"]);
    elementOpen("div", key, ["key", key]);
    elementClose("div");
  elementClose("div");

  elementOpen("div", null, ["class", "my-class"]);
    elementOpen("div", null, null, "class", myClass);
    elementClose("div");
  elementClose("div");

  elementVoid("input", null, ["type", "text", "disabled", true]);

  queries.forEach(function (query) {
    return (elementOpen("div", query.id, ["key", query.id]), elementClose("div"));
  });

  (function () {
    elementOpenStart("div", "test", ["class", "myClass", "key", "test"]);
    attr("id", id);

    for (var _attr in props) attr(_attr, props[_attr]);

    attr("data-expanded", expanded);

    for (var _attr2 in props.attrs) attr(_attr2, props.attrs[_attr2]);

    elementOpenEnd("div");
    return elementClose("div");
  })();

elementClose("div");
```

## Installation

```sh
$ npm install babel-plugin-incremental-dom
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "blacklist": ["react"],
  "plugins": ["incremental-dom"]
}
```

### Via CLI

```sh
$ babel --blacklist react --plugins incremental-dom script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  blacklist: ["react"],
  plugins: ["incremental-dom"]
});
```
