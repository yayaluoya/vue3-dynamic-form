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
 * 事件基类
 * 继承此类就可以成为事件调度者了
 */
var BaseEvent = /** @class */ (function () {
    function BaseEvent() {
        /** 事件执行列表 */
        this.eventList = [];
        /** 延迟触发事件列表 */
        this.delayEventList = [];
    }
    /**
     * 监听事件
     * @param key 唯一key
     * @param _this
     * @param f
     */
    BaseEvent.prototype.on = function (key, _this, f) {
        if (!key) {
            return;
        }
        this.eventList.push({
            key: key,
            this: _this,
            f: f,
        });
    };
    /**
     * 监听一次事件
     * @param key 唯一key
     * @param _this
     * @param f
     */
    BaseEvent.prototype.onOnce = function (key, _this, f) {
        if (!key) {
            return;
        }
        var _that = this;
        //重新包装下该函数
        var _f = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            //清理调该函数
            _that.off(key, _this, _f);
            //
            f.call.apply(f, __spreadArray([this], __read(arg), false));
        };
        //
        this.eventList.push({
            key: key,
            this: _this,
            f: _f,
        });
    };
    /**
     * 取消监听
     * 这些参数可以不传，传了就表示要对该参数做判断
     * @param key
     * @param _this
     * @param f
     */
    BaseEvent.prototype.off = function (key, _this, f) {
        this.eventList = this.eventList.filter(function (item) {
            return !((key ? key == item.key : true) &&
                (_this ? _this == item.this : true) &&
                (f ? f == item.f : true));
        });
    };
    /**
     * 触发事件
     * @param key 唯一key
     * @param arg 需要传递的参数
     */
    BaseEvent.prototype.emit = function (key) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        this.eventList.forEach(function (item) {
            var _a;
            if (item.key === key ||
                (typeof key == 'string' && item.key instanceof RegExp && item.key.test(key)) ||
                (typeof item.key == 'string' && key instanceof RegExp && key.test(item.key)) ||
                (typeof key == 'function' && key(item.key)) ||
                (typeof item.key == 'function' && item.key(key))) {
                (_a = item.f).call.apply(_a, __spreadArray([item.this], __read(arg), false));
            }
        });
    };
    /** 延迟触发 */
    BaseEvent.prototype.deferEmit = function (key) {
        var _this_1 = this;
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        this.delayEventList.push(function () {
            _this_1.emit.apply(_this_1, __spreadArray([key], __read(arg), false));
        });
    };
    /** 执行延迟触发 */
    BaseEvent.prototype.exeDeferEmit = function () {
        this.delayEventList.forEach(function (f) {
            f();
        });
        //
        this.clearDeferEmit();
    };
    /** 清理延迟触发事件 */
    BaseEvent.prototype.clearDeferEmit = function () {
        this.delayEventList.length = 0;
    };
    return BaseEvent;
}());
export { BaseEvent };
