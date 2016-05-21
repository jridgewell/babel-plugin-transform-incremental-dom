Changelog
=========

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Documentation]
> - [Internal]
> - [Polish]

## 3.2.1

- **Bug Fix**
  - Support `import`ing iDOM methods
    - [#51](https://github.com/jridgewell/babel-plugin-incremental-dom/pull/51)

## 3.2.0

- **New Feature**
  - Allow forcing the use of statics when there are constant attributes.
    - [#49](https://github.com/jridgewell/babel-plugin-incremental-dom/pull/49)
- **Bug Fix**
  - Only use `statics` when there is a `key`
    - [#49](https://github.com/jridgewell/babel-plugin-incremental-dom/pull/49)

## 3.1.0

- **New Feature**
  - Pass Components by reference
    - [#43](https://github.com/jridgewell/babel-plugin-incremental-dom/pull/43)
  - Inline JSX Expressions
    - [#46](https://github.com/jridgewell/babel-plugin-incremental-dom/pull/46)
- **Bug Fix**
  - Assign eager variable keys to statics array
    - [#44](https://github.com/jridgewell/babel-plugin-incremental-dom/pull/44)

## 3.0.3

- **Bug Fix**
  - Fix whitespace cleaning around inline elements
    - [e7bcb28f](https://github.com/jridgewell/babel-plugin-incremental-dom/commit/e7bcb28f719812b51a633762ffad3c243121b523)

## 3.0.2

- **Bug Fix**
  - Support multiple returned root nodes
    - [8515f6b0](https://github.com/jridgewell/babel-plugin-incremental-dom/commit/8515f6b00f420a36a2c25f8f1ceca2cacc2bf29e)
  - Do not try to recursively render arbitrary DOM element
    - [e5229ed8](https://github.com/jridgewell/babel-plugin-incremental-dom/commit/e5229ed8dd55501563f7e9d88e60d75f01e96069)
- **Internal**
  - Use a `version` npm script
    - [0a81e9e0](https://github.com/jridgewell/babel-plugin-incremental-dom/commit/0a81e9e03587f375deca36b481d32711ef4973ae)

## 3.0.1

- **Bug Fix**
  - Properly wrap non-returned elements that are the "root" of their function
    - [e2567ff1](https://github.com/jridgewell/babel-plugin-incremental-dom/commit/e2567ff143f68e6b86b544b6b6c8acc0fd5b90c9)

## 3.0.0

- **New Feature**
  - Upgraded to Babel 6
  - Common Runtime support
- **Internal**
  - Massive internal rewrite to support stateless transforms
  - Split apart massive single feature tests into multiple small tests

## 2.2.0

- **New Feature**
  - Add optional Static Attribute hoisting.
    - [#26](https://github.com/babel-plugins/babel-plugin-incremental-dom/pull/26)
- **Bug Fix**
  - Fixes detection of root JSX Element in sub-render functions.
    - [#21](https://github.com/babel-plugins/babel-plugin-incremental-dom/pull/21)
    - [#28](https://github.com/babel-plugins/babel-plugin-incremental-dom/pull/28)
  - Supports JSX Elements implicitly returned by arrow functions.
    - [#20](https://github.com/babel-plugins/babel-plugin-incremental-dom/pull/20)
  - Fixes use of JSX Elements inside Sequence Expressions.
    - [#24](https://github.com/babel-plugins/babel-plugin-incremental-dom/pull/24)

## 2.1.0

- **New Feature**
  - Add an optional function prefix to Incremental DOM functions.

## 2.0.1

- **New Feature**
  - Throw an compile-time error when there is an unused JSX Element.
    - Before, these would be silently removed from the output.
- **Bug Fix**
  - Properly detect the whether the current JSX Element is the "root"
    element of the render function.
    - Before, any JSX Element that appeared laster in the same file
      would be "root". Now, only elements that appear later in the
      current function or it's contianing functions are roots.
- **Internal**
  - Test that compile-errors are thrown.

## 2.0.0

- **New Feature**
  - Support rendering arbitrary children expressions:
    1. "Textual" expressions, including numbers and strings.
    2. Other JSX Elements.
    3. Arrays or Objects containing #1, #2, or #3.
  - Throw an compile-time error when using JSX Namespaces.
- **Internal**
  - A massive rewrite to support full JSX compatibility.

## 1.X

- Initial implementation.
