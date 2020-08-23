/** 缓动方法名 */
export declare enum EasingKey {
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
    easeInOutQuint = "easeInOutQuint"
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
/** 暂停缓动 */
declare type pauseEasing = () => void;
/** 继续缓动 */
declare type continueEasing = () => void;
/**
 * 缓动函数触发器
 * @param {Options} options 配置
 */
export default function EasingTrigger(options: Options): [pauseEasing, continueEasing];
export {};
