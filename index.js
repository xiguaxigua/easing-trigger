const DEFAULT_OPTIONS = {
  type: 'linear',
  func: null,
  start: 0,
  end: null,
  duration: 200,
  onStep: _ => {},
  onComplete: _ => {},
};
const TYPES = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t * t,
  // decelerating to zero velocity
  easeOutQuad: t => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: t => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: t => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: t => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: t => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  easeInQuint: t => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: t => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: t =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};
const TIME_INTERVAL = 17;

const loop =
  window.requestAnimationFrame || (fn => setTimeout(fn, TIME_INTERVAL));

const isArray = v => Object.prototype.toString.call(v) === '[object Array]';

const EasingTrigger = options => {
  const {
    type,
    func,
    start,
    end,
    duration,
    onStep,
    onComplete,
  } = Object.assign({}, DEFAULT_OPTIONS, options);
  const startList = isArray(start) ? start : [start];
  const endList = isArray(end) ? end : [end];
  const easingFunc = func || TYPES[type];
  let time = 0;
  const currValue = startList.slice();
  const step = _ => {
    time += TIME_INTERVAL;
    const process = time / duration;
    startList.forEach((_, index) => {
      currValue[index] =
        startList[index] +
        (endList[index] - startList[index]) * easingFunc(process);
    });
    if (time <= duration) {
      onStep.apply(null, currValue.concat(process))
      loop(step);
    } else {
      onStep.apply(null, endList.concat(process))
      onComplete();
    }
  };
  loop(step);
};

export default EasingTrigger;
