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
import { isArray, isObject, isMap, isDate } from '../is';
/**
 * 对象工具类
 */
var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    /**
     * 获取一个对象的属性
     * @param obj
     * @param key 目标属性，可以是方法，正则表达式，其它的采用==号匹配
     */
    ObjectUtils.getPro = function (obj, key) {
        if (typeof obj != 'object') {
            return;
        }
        var is;
        for (var i in obj) {
            is = false;
            switch (true) {
                case typeof key == 'function':
                    is = key(i);
                    break;
                case key instanceof RegExp:
                    is = key.test(i);
                    break;
                default:
                    is = i == key;
                    break;
            }
            //
            if (is) {
                return obj[i];
            }
        }
    };
    /**
     * 克隆一个对象（普通）
     * 采用序列化和反序列化的方式，function不会被克隆
     * @param _data
     */
    ObjectUtils.clone = function (_data) {
        return JSON.parse(JSON.stringify(_data));
    };
    /**
     * 克隆一个对象（浅层次递归，不处理原型）
     * TODO 注意对于其他内置对象是不处理的
     */
    ObjectUtils.clone2 = function (data) {
        if (isArray(data)) {
            return data.map(function (_) {
                return ObjectUtils.clone2(_);
            });
        }
        if (isMap(data)) {
            return new Map(ObjectUtils.clone2(__spreadArray([], __read(data), false)));
        }
        if (isDate(data)) {
            return new Date(data);
        }
        if (isObject(data)) {
            var _data = {};
            for (var i in data) {
                _data[i] = ObjectUtils.clone2(data[i]);
            }
            return _data;
        }
        return data;
    };
    /**
     * 属性提取
     * @param {*} obj
     * @param {*} props
     */
    ObjectUtils.propGet = function (obj, props) {
        var e_1, _a;
        props = Array.isArray(props) ? props : [props];
        var o = {};
        try {
            for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                var key = props_1_1.value;
                if (isArray(key)) {
                    o[key[0]] = ObjectUtils.getPro(obj, key[1]);
                }
                else {
                    o[key] = obj[key];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return o;
    };
    /**
     * 判断两个对象是否相同
     * TODO 对比时用的是===
     * @param a
     * @param b
     */
    ObjectUtils.same = function (a, b) {
        if (a === b) {
            return true;
        }
        if (typeof a != typeof b) {
            return a === b;
        }
        if (typeof a != 'object' || !a || !b) {
            return a === b;
        }
        for (var i in a) {
            if (!(i in b) || !ObjectUtils.same(a[i], b[i])) {
                return false;
            }
        }
        for (var i in b) {
            if (!(i in a) || !ObjectUtils.same(a[i], b[i])) {
                return false;
            }
        }
        return true;
    };
    /**
     * 在a对象上合并b对象的值
     * 对于数组会合并
     * @param a
     * @param bs
     */
    ObjectUtils.merge = function (a) {
        var e_2, _a;
        var bs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bs[_i - 1] = arguments[_i];
        }
        try {
            for (var bs_1 = __values(bs), bs_1_1 = bs_1.next(); !bs_1_1.done; bs_1_1 = bs_1.next()) {
                var b = bs_1_1.value;
                for (var i in b) {
                    // 如果双方都是数组的话，直接合并
                    if (isArray(a[i]) && isArray(b[i])) {
                        a[i] = __spreadArray(__spreadArray([], __read(a[i]), false), __read(b[i]), false);
                        continue;
                    }
                    // 如果双方都是对象的话则递归
                    if (isObject(a[i]) && isObject(b[i])) {
                        ObjectUtils.merge(a[i], b[i]);
                        continue;
                    }
                    //
                    a[i] = b[i];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (bs_1_1 && !bs_1_1.done && (_a = bs_1.return)) _a.call(bs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return a;
    };
    /**
     * 用b对象替换a对象的值
     * @param a
     * @param bs
     */
    ObjectUtils.replace = function (a) {
        var e_3, _a;
        var bs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            bs[_i - 1] = arguments[_i];
        }
        try {
            for (var bs_2 = __values(bs), bs_2_1 = bs_2.next(); !bs_2_1.done; bs_2_1 = bs_2.next()) {
                var b = bs_2_1.value;
                for (var i in b) {
                    // 如果双方都是数组的话，直接合并
                    if (isArray(a[i]) && isArray(b[i])) {
                        a[i] = __spreadArray([], __read(b[i]), false);
                        continue;
                    }
                    // 如果双方都是对象的话则递归
                    if (isObject(a[i]) && isObject(b[i])) {
                        ObjectUtils.replace(a[i], b[i]);
                        continue;
                    }
                    //
                    a[i] = b[i];
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (bs_2_1 && !bs_2_1.done && (_a = bs_2.return)) _a.call(bs_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return a;
    };
    return ObjectUtils;
}());
export { ObjectUtils };
