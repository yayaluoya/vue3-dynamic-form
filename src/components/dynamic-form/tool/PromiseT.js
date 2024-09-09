/**
 * promise工具
 */
var PromiseT = /** @class */ (function () {
    function PromiseT() {
    }
    /**
     * 以函数的方式获取一个promise
     * @returns
     * @param executor
     */
    PromiseT.getP = function (executor) {
        return new Promise(executor);
    };
    /**
     * 延时
     * @param t
     */
    PromiseT.delay = function (t) {
        if (t === void 0) { t = 0; }
        return new Promise(function (r) {
            setTimeout(function () {
                r();
            }, t);
        });
    };
    return PromiseT;
}());
export { PromiseT };
