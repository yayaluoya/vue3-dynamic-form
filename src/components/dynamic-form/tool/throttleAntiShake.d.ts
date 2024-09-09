/**
 * 创建一个节流函数
 * @param {*} _fun 源函数
 * @param {*} _time 延迟执行时间
 */
export declare function createThrottleFun(_fun: Function, _time: number): (this: any, ...arg: any[]) => void;
/**
 * 创建一个防抖函数
 * @param {*} _fun 源函数
 * @param {*} _time 间隔时间
 */
export declare function createAntiShakeFun(_fun: Function, _time: number): (this: any, ...arg: any[]) => void;
//# sourceMappingURL=throttleAntiShake.d.ts.map