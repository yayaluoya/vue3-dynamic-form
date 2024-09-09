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
import { ArrayUtils } from './ArrayUtils';
/**
 * loading工具
 */
var LoadingT = /** @class */ (function () {
    function LoadingT() {
        /** 加载列表 */
        this.loadingList = [];
    }
    /**
     * 清空
     */
    LoadingT.prototype.clean = function () {
        this.loadingList.length = 0;
    };
    Object.defineProperty(LoadingT.prototype, "loading", {
        /** 是否loading */
        get: function () {
            return this.loadingList.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置loading
     * @param {*} state 状态
     * @param {*} key key
     */
    LoadingT.prototype.set = function (state) {
        var key = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            key[_i - 1] = arguments[_i];
        }
        if (state) {
            this.loadingList.push(key);
        }
        else {
            ArrayUtils.eliminate(this.loadingList, function (_) { return ArrayUtils.same(_, key); });
        }
        return this;
    };
    /**
     * 设置加载
     */
    LoadingT.prototype.setLoading = function () {
        var key = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            key[_i] = arguments[_i];
        }
        this.set.apply(this, __spreadArray([true], __read(key), false));
        return this;
    };
    /**
     * 设置加载完成
     */
    LoadingT.prototype.setLoadComplete = function () {
        var key = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            key[_i] = arguments[_i];
        }
        this.set.apply(this, __spreadArray([false], __read(key), false));
        return this;
    };
    /**
     * 获取是否loading
     * @param  {*} key
     */
    LoadingT.prototype.get = function () {
        var key = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            key[_i] = arguments[_i];
        }
        return this.loadingList.some(function (_) { return ArrayUtils.same(_, key); });
    };
    return LoadingT;
}());
export { LoadingT };
