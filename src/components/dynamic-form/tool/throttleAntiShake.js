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
/**
 * 创建一个节流函数
 * @param {*} _fun 源函数
 * @param {*} _time 延迟执行时间
 */
export function createThrottleFun(_fun, _time) {
    var _setTimeOutId;
    return function () {
        var _this = this;
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        clearTimeout(_setTimeOutId);
        _setTimeOutId = setTimeout(function () {
            _fun.call.apply(_fun, __spreadArray([_this], __read(arg), false));
        }, _time);
    };
}
/**
 * 创建一个防抖函数
 * @param {*} _fun 源函数
 * @param {*} _time 间隔时间
 */
export function createAntiShakeFun(_fun, _time) {
    var _onTime = Date.now();
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (Date.now() - _onTime >= _time) {
            _fun.call.apply(_fun, __spreadArray([this], __read(arg), false));
            _onTime = Date.now();
        }
    };
}
