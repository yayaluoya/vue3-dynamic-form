/**
 * 剪切板工具
 */
export declare class Clipboard {
    /**
     * 设置一段字符串到剪切板
     * @param _str 需要复制的字符串
     */
    static set(_str: string): Promise<boolean>;
    /**
     * 从剪切板获取内容
     */
    static get(): Promise<string>;
}
//# sourceMappingURL=Clipboard.d.ts.map