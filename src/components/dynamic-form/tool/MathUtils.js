var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * 数学函数扩展
 */
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    /**
       * 进制转换
       * 十进制(Decimal)：
       取值数字 0-9；不用前缀。
  
       二进制(Binary)：
       取值数字 0 和 1 ；前缀 0b 或 0B。
  
       十六进制(Hexadecimal)：
       取值数字 0-9 和 a-f ；前缀 0x 或 0X。
  
       八进制(Octal)：
       取值数字 0-7 ；前缀 0o 或 0O (ES6规定)。
  
       需要注意的是，非严格模式下浏览器支持：
       如果有前缀0并且后面只用到 0-7 八个数字的数值时，该数值视为八进制；
       但如果前缀0后面跟随的数字中有8或者9，则视为十进制。
       严格模式下报错
       * @param num 源数值
       * @param radix 进制基数 2-36
       * @returns
       */
    MathUtils.scaleTransform = function (num, radix) {
        if (radix === void 0) { radix = 10; }
        return num.toString(radix);
    };
    MathUtils.RandomFromWithWeight = function (numArr, weightArr) {
        var e_1, _a;
        if (numArr == null || numArr.length == 0) {
            return null;
        }
        var totalWeight = 0;
        try {
            for (var weightArr_1 = __values(weightArr), weightArr_1_1 = weightArr_1.next(); !weightArr_1_1.done; weightArr_1_1 = weightArr_1.next()) {
                var weight = weightArr_1_1.value;
                totalWeight += weight;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (weightArr_1_1 && !weightArr_1_1.done && (_a = weightArr_1.return)) _a.call(weightArr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var randomWeight = MathUtils.Random(0, totalWeight);
        var currentWeight = 0;
        for (var i = 0; i < numArr.length; ++i) {
            currentWeight += weightArr[i];
            if (randomWeight < currentWeight) {
                return numArr[i];
            }
        }
        return numArr[numArr.length - 1];
    };
    /**
     * 获取min~max之间的一个整数
     * @param min
     * @param max
     * @returns
     */
    MathUtils.RandomInt = function (min, max) {
        return Math.round(this.Random(min, max));
    };
    /**
     * 获取一个随机数min~max之间的一个随机数
     * @param min
     * @param max
     * @returns
     */
    MathUtils.Random = function (min, max) {
        if (min == max) {
            return min;
        }
        return (max - min) * Math.random() + min;
    };
    /**
     * 获取一个范围内随机整数
     * @param min 最小值
     * @param max 最大值
     */
    MathUtils.randomRangeInt = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    /**
     * 判定概率命中
     * @param ratio 概率，百分数
     */
    MathUtils.RandomRatio = function (ratio) {
        var v = MathUtils.RandomInt(0, 10000) * 0.01;
        return ratio > v;
    };
    MathUtils.Clamp = function (value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    MathUtils.Clamp01 = function (value) {
        return this.Clamp(value, 0, 1);
    };
    /**
     * 获取符号
     * @param value
     * @returns
     */
    MathUtils.Sign = function (value) {
        if (value == 0)
            return 1;
        return value > 0 ? 1 : -1;
    };
    MathUtils.GetNumCount = function (num) {
        var numberCount = 0;
        var newNumber = num;
        while (newNumber / 10 > 0) {
            newNumber = Math.floor(newNumber / 10);
            numberCount++;
        }
        return numberCount;
    };
    MathUtils.Lerp = function (from, to, progress) {
        return from + (to - from) * MathUtils.Clamp01(progress);
    };
    MathUtils.MoveTowardsAngle = function (current, target, maxDelta) {
        var num = MathUtils.DeltaAngle(current, target);
        if (0 - maxDelta < num && num < maxDelta) {
            return target;
        }
        target = current + num;
        return MathUtils.MoveTowards(current, target, maxDelta);
    };
    MathUtils.MoveTowards = function (current, target, maxDelta) {
        if (Math.abs(target - current) <= maxDelta) {
            return target;
        }
        return current + Math.sign(target - current) * maxDelta;
    };
    MathUtils.DeltaAngle = function (current, target) {
        var num = MathUtils.Repeat(target - current, 360);
        if (num > 180) {
            num -= 360;
        }
        return num;
    };
    MathUtils.Repeat = function (t, length) {
        return MathUtils.Clamp(t - Math.floor(t / length) * length, 0, length);
    };
    MathUtils.IsSimilar = function (n1, n2) {
        return n1 == n2;
    };
    MathUtils.Deg2Rad = 0.0175;
    MathUtils.Rad2Deg = 57.2958;
    return MathUtils;
}());
export { MathUtils };
