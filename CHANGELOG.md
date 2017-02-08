Changelog
=========

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Change]

## 4.1.0

- **New Feature**
  - Add basic support for skip via special attribute
    - [#79](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/79/)
  - Identify `iDOM.patch` calls a JSX roots
    - [#81](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/81)
  - Eagerly evaluate attributes that could mutate a key, instead of throwing error
    - [#84](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/84)
  - Add UUID Prefix option
    - [#89](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/89)
- **Bug Fix**
  - Support `JSXElement` as direct child of `JSXAttribute`
    - [23d8aca9](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/23d8aca903f98d714e6be77d80f82f20f84f1fd0)
  - Fix a bug with deferred callbacks where branches have different argument lengths
    - [021612a4](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/021612a499318543328001bd696140145b44629c)
  - `requireStaticsKey = false` will keep attributes in correct order
    - [e7735620](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/e7735620fac1bb5a1d42c2883bc2258b0b4e61c3)
- **Polish**
  - Attempt to generate similar wrapper parameter names.
    - [f50937a7](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/f50937a7500b0e768552b9c97a9ada5f88532827)
  - Attempt to generate similar key variable names.
    - [ce178584](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/ce17858432c4876163c1ef3a4a22ae20c55cb85f)

## 4.0.2

- **Polish**
  - Attempt to generate similar statics hoist names, to aid debugging
    - [#78](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/78)
  - Fall back to element tag when generating hoist names
    - [#78](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/78)

## 4.0.1

- **Polish**
  - Attempt to generate similar hoist names, to aid debugging
    - [7fa4ea68](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/7fa4ea6814185e069525ab13c5f7a0e3797c4ea9)

## 4.0.0

- **New Feature**
  - Add `moduleSource` option to auto import needed iDOM methods
    - [#71](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/71)
  - Add `runtimeModuleSource` option to auto import needed runtime methods
    - [#72](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/72)
  - Add `spreadAttribute` runtime method
    - [#59](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/59)
  - Defer calling functions until wrapper executes
    - [#75](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/75)
- **Bug Fix**
  - Forbid error caused by mutating `key` after referencing in another attribute
    - [08c54e5b](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/08c54e5b3b3e082d6a7ff8b628373808743cc9cf)
  - Ensure logical expressions do not call iDOM methods
    - [42778115](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/42778115d0eefcdab4b1f6227be3aee3bd00de35)
  - Ensure conditional expressions do not call iDOM methods
    - [d9462c5c](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/d9462c5c2e92d94e08f9871bfa226ca025628214)
- **Polish**
  - Convert "special" literals (numbers, `undefined`, `null`) to strings
    - [#64](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/64)
  - Template strings no longer require a `renderArbitrary` call
    - [1009af83](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/1009af83006949e0956ee79c34f349ad14eed0fd)
  - Unwrap a child expression's sequence to avoid unneeded `renderArbitrary` calls
    - [bac0d802](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/bac0d802cf55dfdac0ef98b8eee10f46cd733e04)
    - [172bd0ba](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/172bd0ba7f13b4c448db271e16a10f49ee09c1be)
    - [644cf5a5](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/644cf5a58cfb91b01b7a868669478a83d10052d1)
  - Use more performant jsxWrapper
    - [#74](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/74)
  - Speed up transform
    - [1266d907](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/1266d9070a5e19e44d18e48ae85fb5feb605f2d5)
    - [90066991](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/900669911bc205b84d33dec02614d50462262c2d)
- **Change**
  - Rename to `babel-plugin-transform-incremental-dom`
  - `hoist` is now standard behavior
    - [#60](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/60)
  - Using static attributes will generate a UUID key by default
    - [#60](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/60)
  - Remove `prefix` option in favor of `moduleSource`
    - [#60](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/60)
  - Remove `runtime` option in favor of `runtimeModuleSource`
    - [#60](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/60)

## 3.4.0

- **New Feature**
  - Optimize conditional children expressions
    - [#58](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/58)
  - Enable `fastRoot` option in inline comments
    - [#61](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/61)
- **Bug Fix**
  - Transpile JSX Elements outside functions
    - [#62](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/62)
  - Memoize key expressions
    - [#63](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/63)
- **Internal**
  - Add `babel-plugin-syntax-jsx` dependency
    - [bf426fca](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/bf426fcafc60bab64964104bd041487b278ec905)

## 3.3.0

- **New Feature**
  - Add a Fast path for JSX under the Root node
    - [#47](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/47)
  - Add support for Attribute Namespaces
    - [#55](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/55)
  - `forceStatics` option now generates a UUID `key` for key-less nodes
    - [9db682c7](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/9db682c78732682c022a32077dc499a98c9f4bb7)

## 3.2.1

- **Bug Fix**
  - Support `import`ing iDOM methods
    - [#51](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/51)

## 3.2.0

- **New Feature**
  - Allow forcing the use of statics when there are constant attributes
    - [#49](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/49)
- **Bug Fix**
  - Only use `statics` when there is a `key`
    - [#49](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/49)

## 3.1.0

- **New Feature**
  - Pass Components by reference
    - [#43](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/43)
  - Inline JSX Expressions
    - [#46](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/46)
- **Bug Fix**
  - Assign eager variable keys to statics array
    - [#44](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/pull/44)

## 3.0.3

- **Bug Fix**
  - Fix whitespace cleaning around inline elements
    - [e7bcb28f](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/e7bcb28f719812b51a633762ffad3c243121b523)

## 3.0.2

- **Bug Fix**
  - Support multiple returned root nodes
    - [8515f6b0](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/8515f6b00f420a36a2c25f8f1ceca2cacc2bf29e)
  - Do not try to recursively render arbitrary DOM element
    - [e5229ed8](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/e5229ed8dd55501563f7e9d88e60d75f01e96069)
- **Internal**
  - Use a `version` npm script
    - [0a81e9e0](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/0a81e9e03587f375deca36b481d32711ef4973ae)

## 3.0.1

- **Bug Fix**
  - Properly wrap non-returned elements that are the "root" of their function
    - [e2567ff1](https://github.com/jridgewell/babel-plugin-transform-incremental-dom/commit/e2567ff143f68e6b86b544b6b6c8acc0fd5b90c9)

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
    - [#26](https://github.com/babel-plugins/babel-plugin-transform-incremental-dom/pull/26)
- **Bug Fix**
  - Fixes detection of root JSX Element in sub-render functions.
    - [#21](https://github.com/babel-plugins/babel-plugin-transform-incremental-dom/pull/21)
    - [#28](https://github.com/babel-plugins/babel-plugin-transform-incremental-dom/pull/28)
  - Supports JSX Elements implicitly returned by arrow functions.
    - [#20](https://github.com/babel-plugins/babel-plugin-transform-incremental-dom/pull/20)
  - Fixes use of JSX Elements inside Sequence Expressions.
    - [#24](https://github.com/babel-plugins/babel-plugin-transform-incremental-dom/pull/24)

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
