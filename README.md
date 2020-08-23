# easing-trigger

## Install

### use npm

```
npm install easing-trigger --save
```

### use cdn

```html
<script src="https://unpkg.com/easing-trigger/lib/index.umd.js"></script>
```

> window.EasingTrigger

## Start

```js
import EasingTrigger, { EasingKey } from "easing-trigger";

EasingTrigger({
  type: EasingKey.easeInCubic, // Built-in easing function
  // func: x => x, // custom easing function
  start: window.scrollY, // start value
  end: 0, // end value
  duration: 200, // time interval, default 200
  // onComplete: _ => {}, // callback while complete
  onStep: function (v, x) {
    window.scroll(0, v);
  }, // callback while complete
});
```

```js
import EasingTrigger from "easing-trigger";

EasingTrigger({
  type: "easeInOutQuint", // Built-in easing function
  // func: x => x, // custom easing function
  start: [10, 20], // start value
  end: [100, 200], // end value
  duration: 200, // time interval, default 200
  // onComplete: _ => {}, // callback while complete
  onStep: function (a, b, x) {
    console.log(a, b, x);
  }, // callback while complete
});
```

- a: from 10 to 100
- b: from 20 to 200
- x: process

## All Built-in easing function

https://xiguaxigua.gitlab.io/easing-trigger/output/

## Demo

https://codepen.io/xiguaxigua/pen/bORWZp
