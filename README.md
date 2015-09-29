# babel-plugin-incremental-dom [![Build Status](https://travis-ci.org/babel-plugins/babel-plugin-incremental-dom.svg?branch=master)](https://travis-ci.org/babel-plugins/babel-plugin-incremental-dom)

Turn JSX into [Incremental DOM](http://google.github.io/incremental-dom/).

## Example

**In**

```javascript
function render(data) {
    var header = data.conditional ? <div /> : null;
    var collection = data.items.map((item) => {
        return <li key={item.id} class={item.className}>{item.name}</li>;
    });

    return <div id="container">
        {header}
        <ul>{collection}</ul>
        <p {...data.props}>Some features</p>
    </div>;
}
```

**Out**

```javascript
function _attr(value, name) {
    attr(name, value);
}

function _renderArbitrary(child) {
    var type = typeof child;

    if (type === "number" || (type === "string" || child && child instanceof String)) {
        text(child);
    } else if (type === "function" && child.__jsxDOMWrapper) {
        child();
    } else if (Array.isArray(child)) {
        child.forEach(_renderArbitrary);
    } else {
        _forOwn(child, _renderArbitrary);
    }
}

function _forOwn(object, iterator) {
    for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
}

var _hasOwn = Object.prototype.hasOwnProperty;

function _jsxWrapper(func) {
    func.__jsxDOMWrapper = true;
    return func;
}

function render(data) {
    var header = data.conditional ? _jsxWrapper(function () {
        return elementVoid("div");
    }) : null;
    var collection = data.items.map(function (item) {
        var _item$id = item.id,
            _item$className = item.className,
            _item$name = item.name;

        return _jsxWrapper(function () {
            elementOpen("li", _item$id, ["key", _item$id], "class", _item$className);

            _renderArbitrary(_item$name);

            return elementClose("li");
        });
    });

    elementOpen("div", null, ["id", "container"]);

    _renderArbitrary(header);

    elementOpen("ul");

    _renderArbitrary(collection);

    elementClose("ul");
    elementOpenStart("p");

    _forOwn(data.props, _attr);

    elementOpenEnd("p");
    text("Some features");
    elementClose("p");
    return elementClose("div");
}
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
  "plugins": ["incremental-dom"],
  "extra": {
    "incremental-dom": {
        "prefix": "IncrementalDOM"
    }
  }
}
```

An optional [function prefix](#function-prefix) may be passed.

### Via CLI

```sh
$ babel --blacklist react --plugins incremental-dom script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  blacklist: ["react"],
  plugins: ["incremental-dom"],
  extra: {
    "incremental-dom": {
        prefix: "IncrementalDOM" // Optional function prefix
    }
  }
});
```

An optional [function prefix](#function-prefix) may be passed.

### Function Prefix

By deafult, `babel-plugin-incremental-dom` directly calls Incremental
DOM functions:

```js
elementOpen("div");
elementClose("div");
```

If you are instead including Incremental DOM via a browser script, it
may be easier to reference the functions from the `IncrementalDOM` object:

```js
IncrementalDOM.elementOpen("div");
IncrementalDOM.elementClose("div");
```

To do this, simply add the `prefix` option to the Incremental DOM
plugin:

```json
{
  "plugins": ["incremental-dom"],
  "extra": {
    "incremental-dom": {
        "prefix": "IncrementalDOM"
    }
  }
}
```
