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
import { ArrayUtils } from './ArrayUtils';
/**
 * 单例隐藏字段名
 */
var instanceName = Symbol();
/**
 * 单例工具，一般当装饰器使用
 * TODO 被装饰的类的构造方法最好不要是public类型的
 * @param {*} names 单例字段名称，可以是多个
 * @param {*} passive 是否被动，指的是单例字段被get时才new
 * @param {*} arg new时带的参数
 */
export function instanceTool(names, passive) {
    if (names === void 0) { names = ['instance', 'I']; }
    if (passive === void 0) { passive = true; }
    var arg = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arg[_i - 2] = arguments[_i];
    }
    return function (class_) {
        var e_1, _a;
        var newF = function () {
            return class_[instanceName] || (class_[instanceName] = new (class_.bind.apply(class_, __spreadArray([void 0], __read(arg), false)))());
        };
        passive || newF();
        try {
            for (var _b = __values(ArrayUtils.arraify(names)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                Object.defineProperty(class_, name_1, {
                    configurable: false,
                    enumerable: true,
                    get: function () {
                        return newF();
                    },
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
}
