/**
 * json解析
 * 如果解析出错了会返回默认值
 * @param str
 * @param def
 * @param reviver
 */
export declare function JSONPar<T = any>(str: string, def?: T, reviver?: (this: any, key: string, value: any) => any): T;
//# sourceMappingURL=JSONPar.d.ts.map