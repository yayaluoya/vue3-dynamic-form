/**
 * loading工具
 */
export declare class LoadingT {
    /** 加载列表 */
    private loadingList;
    /**
     * 清空
     */
    clean(): void;
    /** 是否loading */
    get loading(): boolean;
    /**
     * 设置loading
     * @param {*} state 状态
     * @param {*} key key
     */
    set(state: boolean, ...key: any[]): this;
    /**
     * 设置加载
     */
    setLoading(...key: any[]): this;
    /**
     * 设置加载完成
     */
    setLoadComplete(...key: any[]): this;
    /**
     * 获取是否loading
     * @param  {*} key
     */
    get(...key: any[]): boolean;
}
//# sourceMappingURL=LoadingT.d.ts.map