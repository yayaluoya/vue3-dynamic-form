/**
 * 文件处理工具
 */
export declare class FileT {
    /**
     * 下载文件
     * @param {*} url 地址
     * @param {*} name 文件名字
     */
    static download(url: string, name?: string): void;
    /**
     * 文件分片
     * @param file 文件
     * @param partSize 分片大小，单位为字节
     */
    static slice(file: File, partSize: number): Blob[];
}
//# sourceMappingURL=FileT.d.ts.map