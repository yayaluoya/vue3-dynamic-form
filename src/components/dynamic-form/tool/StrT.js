/**
 * 字符串工具
 */
var StrT = /** @class */ (function () {
    function StrT() {
    }
    /**
     * 省略
     * @param s
     * @param n
     */
    StrT.omit = function (s, n) {
        if (s.length > n) {
            return s.slice(0, n) + '...';
        }
        return s;
    };
    return StrT;
}());
export { StrT };
