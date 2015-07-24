# babel-plugin-incremental-dom

Turn jsx into [incremental-dom](http://google.github.io/incremental-dom/).

## Example

**In**

```javascript
<h1>Hello World</h1>
```

**Out**

```javascript
"use strict";

elementOpen("h1");
text("Hello World");
elementClose("h1");
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
