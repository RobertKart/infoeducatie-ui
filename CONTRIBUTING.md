# Advice for future contributors

## Communication

- English in the codebase and Git messages
- Romanian on issues and comments

## Coding style

- we use the [Google Javascript Style Guide](http://google.github.io/styleguide/javascriptguide.xml)
- run the linter with `gulp lint`
- indentation of 2 spaces in all the files.
- strive to keep the line width under 80 characters
- order of methods in a file:
  - React lifecycle with `render` at the end
  - `renderSomething` _sub-methods_
  - `onActionCallback` methods
  - other

## Github

- use milestones for structuring your work
- labels:
  - `minor` - can be tackled by a newbie
  - `bug`
  - `important` - somebody thinks this has a higher priority
  - `urgent` - somebody important thinks this has a higher priority
  - `project` - a collection of tasks that should be done in separate issues

## Other

- keep in README.md a living documentation of the directory and files structure
- currently we don't have tests... but that will change in the future
- in `mixins` add code that uses `this` and in `lib` add pure functions

## Default Javascript File

- `use strict`
- use ES6 classes
- add a `my-class.less` file and import it from `main.less`

```js
"use strict";

import React from "react";

import "../main.less";


export default class MyClass extends React.Component {
  static displayName = "MyClass"
  static propTypes = { initialCount: React.PropTypes.number }
  state = { count: props.initialCount }


  render() {
    return <div className="my-class">
    </div>;
  }
}
```
