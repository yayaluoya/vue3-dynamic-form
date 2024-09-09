/**
 * 额外的key类型
 */
type keyType = RegExp | {
    (str: string): boolean;
};
/**
 * 事件基类
 * 继承此类就可以成为事件调度者了
 */
export declare class BaseEvent<E extends string | symbol = string | symbol> {
    /** 事件执行列表 */
    private eventList;
    /** 延迟触发事件列表 */
    private delayEventList;
    /**
     * 监听事件
     * @param key 唯一key
     * @param _this
     * @param f
     */
    on(key: E | keyType, _this: any, f: Function): void;
    /**
     * 监听一次事件
     * @param key 唯一key
     * @param _this
     * @param f
     */
    onOnce(key: E | keyType, _this: any, f: Function): void;
    /**
     * 取消监听
     * 这些参数可以不传，传了就表示要对该参数做判断
     * @param key
     * @param _this
     * @param f
     */
    off(key?: E | keyType, _this?: any, f?: Function): void;
    /**
     * 触发事件
     * @param key 唯一key
     * @param arg 需要传递的参数
     */
    emit(key: E | keyType, ...arg: any[]): void;
    /** 延迟触发 */
    deferEmit(key: E | keyType, ...arg: any[]): void;
    /** 执行延迟触发 */
    exeDeferEmit(): void;
    /** 清理延迟触发事件 */
    clearDeferEmit(): void;
}
export {};
//# sourceMappingURL=BaseEvent.d.ts.map