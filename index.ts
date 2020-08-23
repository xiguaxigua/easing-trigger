/** 缓动方法名 */
export enum EasingKey {
  linear = "linear",
  easeInQuad = "easeInQuad",
  easeOutQuad = "easeOutQuad",
  easeInOutQuad = "easeInOutQuad",
  easeInCubic = "easeInCubic",
  easeOutCubic = "easeOutCubic",
  easeInOutCubic = "easeInOutCubic",
  easeInQuart = "easeInQuart",
  easeOutQuart = "easeOutQuart",
  easeInOutQuart = "easeInOutQuart",
  easeInQuint = "easeInQuint",
  easeOutQuint = "easeOutQuint",
  easeInOutQuint = "easeInOutQuint",
}

/** 配置 */
export interface Options {
  /** 缓动类型 */
  type?: EasingKey | "string";
  /** 自定义缓动函数 */
  func?: Function;
  /** 初始值 */
  start?: number | number[];
  /** 终止值 */
  end?: number | number[];
  /** 时间间隔 */
  duration?: number;
  /** 缓动中执行回调 */
  onStep?: Function;
  /** 缓动结束执行回调 */
  onComplete?: Function;
}

const TYPES = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};

/** 默认配置 */
const DEFAULT_OPTIONS: Options = {
  type: EasingKey.linear,
  func: null,
  start: 0,
  end: null,
  duration: 200,
  onStep: () => {},
  onComplete: () => {},
};

/** 时间间隔 */
const TIME_INTERVAL = 17;

/** 刷新方式 */
const loop =
  window.requestAnimationFrame || ((fn) => setTimeout(fn, TIME_INTERVAL));

/** 判断是否为数组 */
const isArray = (v) => Object.prototype.toString.call(v) === "[object Array]";

/** 暂停缓动 */
type pauseEasing = () => void;
/** 继续缓动 */
type continueEasing = () => void;

/**
 * 缓动函数触发器
 * @param {Options} options 配置
 */
export default function EasingTrigger(
  options: Options
): [pauseEasing, continueEasing] {
  // 初始化配置
  const {
    type,
    func,
    start,
    end,
    duration,
    onStep,
    onComplete,
  } = Object.assign({}, DEFAULT_OPTIONS, options);

  /** 初始值列表 */
  const startList = (isArray(start) ? start : [start]) as number[];
  /** 终止值列表 */
  const endList = (isArray(end) ? end : [end]) as number[];
  /** 实际的缓动函数 */
  const easingFunc = func || TYPES[type];

  let time = 0;
  const currValue = startList.slice();

  let runState = true;

  const step = () => {
    time += TIME_INTERVAL;
    const process = time / duration;
    startList.forEach((_, index) => {
      currValue[index] =
        startList[index] +
        (endList[index] - startList[index]) * easingFunc(process);
    });
    if (!runState) return;
    if (time <= duration) {
      onStep.apply(null, currValue.concat(process));
      loop(step);
    } else {
      onStep.apply(null, endList.concat(process));
      onComplete();
    }
  };

  loop(step);

  function pauseLoop() {
    runState = false;
  }

  function continueLoop() {
    runState = true;
    loop(step);
  }

  return [pauseLoop, continueLoop];
}
