/**
 * 3D相关的数学工具
 */
var MathUtils3D = /** @class */ (function () {
    function MathUtils3D() {
    }
    MathUtils3D.isZero = function (v) {
        return Math.abs(v) < MathUtils3D.zeroTolerance;
    };
    MathUtils3D.nearEqual = function (n1, n2) {
        return MathUtils3D.isZero(n1 - n2);
    };
    MathUtils3D.fastInvSqrt = function (value) {
        if (MathUtils3D.isZero(value))
            return value;
        return 1.0 / Math.sqrt(value);
    };
    /**
     * 单精度浮点(float)零的容差
     */
    MathUtils3D.zeroTolerance = 1e-6;
    /**
     * 浮点数默认最大值
     */
    MathUtils3D.MaxValue = 3.40282347e38;
    /**
     * 浮点数默认最小值
     */
    MathUtils3D.MinValue = -3.40282347e38;
    /**
     * 角度转弧度系数
     */
    MathUtils3D.Deg2Rad = Math.PI / 180;
    return MathUtils3D;
}());
export { MathUtils3D };
