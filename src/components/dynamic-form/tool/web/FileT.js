import { ArrayUtils } from '../ArrayUtils';
/**
 * 文件处理工具
 */
var FileT = /** @class */ (function () {
    function FileT() {
    }
    /**
     * 下载文件
     * @param {*} url 地址
     * @param {*} name 文件名字
     */
    FileT.download = function (url, name) {
        var _a;
        if (!name) {
            name = ((_a = new URL(url).pathname.match(/[^/]+$/)) === null || _a === void 0 ? void 0 : _a[0]) || '';
        }
        var a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    /**
     * 文件分片
     * @param file 文件
     * @param partSize 分片大小，单位为字节
     */
    FileT.slice = function (file, partSize) {
        var fileParts = [];
        for (var i = 0; i <= Math.floor(file.size / partSize); i++) {
            fileParts.push(file.slice(i * partSize, Math.min(partSize * (i + 1), file.size)));
        }
        return ArrayUtils.eliminate(fileParts, function (_) { return _.size <= 0; });
    };
    return FileT;
}());
export { FileT };
