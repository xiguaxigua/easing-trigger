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
import EasingTrigger from 'easing-trigger'

EasingTrigger({
  type: 'easeInOutQuint', // Built-in easing function
  // func: x => x, // custom easing function
  start: window.scrollY, // start value
  end: 0, // end value
  duration: 10000, // time interval
  // onComplete: _ => {}, // callback while complete
  onStep: function (v, x) { window.scroll(0, v) } // callback while complete
})
```

## All Built-in easing function

https://xiguaxigua.gitlab.io/easing-trigger/output/

## Demo

https://codepen.io/xiguaxigua/pen/bORWZp

