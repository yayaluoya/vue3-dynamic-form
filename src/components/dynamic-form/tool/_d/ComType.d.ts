/**
 * 类型数组化
 */
type ArraifyT<T = any> = T | T[];

/**
 * 带约束的挑选类型部分key
 */
type typeCheckK<T, K extends keyof T> = K;

/**
 * 获取数组元素类型
 */
type getArrayItemType<T> = T extends Array<infer A> ? A : any;
