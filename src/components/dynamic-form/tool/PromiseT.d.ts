/**
 * promise工具
 */
export declare class PromiseT {
    /**
     * 以函数的方式获取一个promise
     * @returns
     * @param executor
     */
    static getP<T = void>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    /**
     * 延时
     * @param t
     */
    static delay(t?: number): Promise<void>;
}
//# sourceMappingURL=PromiseT.d.ts.map