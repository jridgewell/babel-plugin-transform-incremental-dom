Changelog
=========

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Documentation]
> - [Internal]
> - [Polish]

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
