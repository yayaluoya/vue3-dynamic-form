/**
 * 单依赖文件
 * TODO 为了解决循环依赖问题
 */
var SingleDependence = /** @class */ (function () {
    function SingleDependence() {
    }
    /**
     * 添加
     * @param key
     * @param value
     */
    SingleDependence.add = function (key, value) {
        this.mapping.set(key, value);
    };
    /**
     * 获取
     * @param key
     * @returns
     */
    SingleDependence.get = function (key) {
        return this.mapping.get(key);
    };
    SingleDependence.mapping = new Map();
    return SingleDependence;
}());
export { SingleDependence };
