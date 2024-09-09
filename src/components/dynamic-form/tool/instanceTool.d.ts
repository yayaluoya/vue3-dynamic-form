/**
 * 单例工具，一般当装饰器使用
 * TODO 被装饰的类的构造方法最好不要是public类型的
 * @param {*} names 单例字段名称，可以是多个
 * @param {*} passive 是否被动，指的是单例字段被get时才new
 * @param {*} arg new时带的参数
 */
export declare function instanceTool<T extends new (...arg: any[]) => any>(names?: ArraifyT<string>, passive?: boolean, ...arg: ConstructorParameters<T>): (class_: T) => void;
//# sourceMappingURL=instanceTool.d.ts.map