/**
 * 单依赖文件
 * TODO 为了解决循环依赖问题
 */
export declare class SingleDependence {
    private static mapping;
    /**
     * 添加
     * @param key
     * @param value
     */
    static add(key: any, value: any): void;
    /**
     * 获取
     * @param key
     * @returns
     */
    static get<T>(key: any): T;
}
//# sourceMappingURL=SingleDependence.d.ts.map