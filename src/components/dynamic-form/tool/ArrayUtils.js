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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { MathUtils } from './MathUtils';
import { ObjectUtils } from './obj/ObjectUtils';
/**
 * 数组工具
 */
var ArrayUtils = /** @class */ (function () {
    function ArrayUtils() {
    }
    /**
     * 根据索引删除一个数据
     * @param arr 源数组
     * @param index 索引
     */
    ArrayUtils.removeAt = function (arr, index) {
        if (index < 0) {
            return false;
        }
        if (arr.length <= index)
            return false;
        arr.splice(index, 1);
        return true;
    };
    /**
     * 填充指定数量的数据
     * @param {*} d
     * @param {*} length
     */
    ArrayUtils.fill = function (d, length) {
        if (length === void 0) { length = 0; }
        return Array.from({
            length: length,
        }).map(function () {
            return ObjectUtils.clone2(d);
        });
    };
    /**
     * 获取数组的某个元素
     * @param array
     * @param _n 索引，可以是负数
     */
    ArrayUtils.at = function (array, _n) {
        if (array.at) {
            return array.at(_n);
        }
        // console.log(_n);
        if (_n >= 0) {
            return array[_n];
        }
        else {
            return array[array.length + _n];
        }
    };
    /**
     * 判断两个数组内容是否相同
     * TODO 元素顺序不会产生影响
     * @param x x数组
     * @param y y数组
     */
    ArrayUtils.same = function (x, y) {
        var e_1, _a;
        if (!x || !y)
            return false;
        if (x.length != y.length)
            return false;
        //方法： 用一个mop来统计x数组各个元素出现的次数，再用y数组来递减各元素出现的次数，如果最终结果为0则两个数组相同
        var m = new Map();
        x.forEach(function (item) {
            m.set(item, (m.has(item) ? m.get(item) : 0) + 1);
        });
        y.forEach(function (item) {
            m.set(item, (m.has(item) ? m.get(item) : 0) - 1);
        });
        //只要其中一元素的统计不为0就返回false
        var b = true;
        try {
            for (var m_1 = __values(m), m_1_1 = m_1.next(); !m_1_1.done; m_1_1 = m_1.next()) {
                var _b = __read(m_1_1.value, 2), _ = _b[0], _number = _b[1];
                if (_number != 0) {
                    b = false;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (m_1_1 && !m_1_1.done && (_a = m_1.return)) _a.call(m_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return b;
    };
    /**
     * 数组是否包含某个数据
     * @param arr
     * @param op
     */
    ArrayUtils.has = function (arr, op) {
        var index = -1;
        if (typeof op == 'function') {
            index = arr.findIndex(op);
        }
        else {
            index = arr.indexOf(op);
        }
        return index >= 0;
    };
    /**
     * 随机打乱数组
     * @param _array 目标数组
     */
    ArrayUtils.upset = function (_array) {
        return _array.sort(function () {
            return Math.random() - 0.5;
        });
    };
    /**
     * 随机获取数组中的随机值，可指定长度
     * @param _array 原数组
     * @param _n 随机个数
     * @param _weight 权重列表
     */
    ArrayUtils.random = function (_array, _n, _weight) {
        if (_n === void 0) { _n = 1; }
        if (_weight === void 0) { _weight = {}; }
        if (!_array || _array.length <= 0) {
            return;
        }
        //根据权重生成索引列表
        var _indexArray = _array
            .map(function (_, index) {
            var _a;
            return ArrayUtils.fill(index, (_a = _weight[index]) !== null && _a !== void 0 ? _a : 1);
        })
            .reduce(function (a, b) {
            a.push.apply(a, __spreadArray([], __read(b), false));
            return a;
        }, []);
        //
        var _newArray = [];
        for (var _i = 0; _i < _n; _i++) {
            if (_indexArray.length <= 0) {
                break;
            }
            var _index = MathUtils.RandomInt(0, _indexArray.length - 1);
            _newArray.push(_array[_indexArray[_index]]);
            ArrayUtils.eliminate(_indexArray, _indexArray[_index]);
        }
        return _newArray;
    };
    /**
     * 剔除掉数组指定内容
     * @param {*} array 原数组
     * @param {*} v 验证方式 可以是方法和正则，如果都不是的话采用==来验证，这些条件都可以是数组
     */
    ArrayUtils.eliminate = function (array, v) {
        if (!Array.isArray(v)) {
            v = [v];
        }
        v.forEach(function (v) {
            var _if = true;
            //循环删除查找到的满足条件的元素，直到找不到为止
            while (_if) {
                var index = void 0;
                switch (true) {
                    case typeof v == 'function':
                        index = array.findIndex(v);
                        break;
                    case v instanceof RegExp:
                        index = array.findIndex(function (_) { return v.test(_); });
                        break;
                    default:
                        index = array.findIndex(function (_) { return _ == v; });
                        break;
                }
                if (index == -1) {
                    _if = false;
                }
                else {
                    array.splice(index, 1);
                }
            }
        });
        return array;
    };
    /**
     * 数组化
     * @param target
     * @returns
     */
    ArrayUtils.arraify = function (target) {
        return Array.isArray(target) ? target : [target];
    };
    /**
     * 是否有重复内容
     */
    ArrayUtils.isRepeat = function (arr) {
        return arr.length != __spreadArray([], __read(new Set(arr)), false).length;
    };
    return ArrayUtils;
}());
export { ArrayUtils };
