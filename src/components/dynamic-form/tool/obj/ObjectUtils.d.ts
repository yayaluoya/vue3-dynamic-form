/**
 * 对象工具类
 */
export declare class ObjectUtils {
    /**
     * 获取一个对象的属性
     * @param obj
     * @param key 目标属性，可以是方法，正则表达式，其它的采用==号匹配
     */
    static getPro(obj: object, key: string | number | {
        (i: string): boolean;
    } | RegExp): any;
    /**
     * 克隆一个对象（普通）
     * 采用序列化和反序列化的方式，function不会被克隆
     * @param _data
     */
    static clone<T>(_data: T): T;
    /**
     * 克隆一个对象（浅层次递归，不处理原型）
     * TODO 注意对于其他内置对象是不处理的
     */
    static clone2<T>(data: T): T;
    /**
     * 属性提取
     * @param {*} obj
     * @param {*} props
     */
    static propGet(obj: any, props: ArraifyT<string | [string, string | number | {
        (i: string): boolean;
    } | RegExp]>): {};
    /**
     * 判断两个对象是否相同
     * TODO 对比时用的是===
     * @param a
     * @param b
     */
    static same(a: any, b: any): boolean;
    /**
     * 在a对象上合并b对象的值
     * 对于数组会合并
     * @param a
     * @param bs
     */
    static merge<T>(a: T, ...bs: T[]): T;
    /**
     * 用b对象替换a对象的值
     * @param a
     * @param bs
     */
    static replace<T>(a: T, ...bs: T[]): T;
}
//# sourceMappingURL=ObjectUtils.d.ts.map