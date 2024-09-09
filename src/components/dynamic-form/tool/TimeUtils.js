import moment from 'moment';
/**
 * 时间工具
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    Object.defineProperty(TimeUtils, "format", {
        /**
         * 格式
         * TODO 可重写
         */
        get: function () {
            return 'YYYY-MM-DD HH:mm:ss';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取时间
     * @param op
     * @returns
     */
    TimeUtils.getTime = function (op) {
        return moment(op).format(this.format);
    };
    TimeUtils.makeTimeLeftString = function (time, separator, flag) {
        if (separator === void 0) { separator = ':'; }
        if (flag === void 0) { flag = false; }
        var second;
        var minute;
        var day;
        var ret = '';
        var hour;
        if (time <= 0) {
            ret = ret + '00:00';
            return ret;
        }
        if (time > this.ONE_YEAR) {
            ret = '大于一年';
            return ret;
        }
        if (flag) {
            if (time > this.ONE_DAY) {
                day = Math.floor(time / this.ONE_DAY);
                ret = day + '天';
            }
            else if (time >= 3600) {
                hour = Math.floor(time / 3600);
                ret = hour + '小时';
            }
            else {
                minute = Math.floor(time / 60);
                if (minute < 10)
                    ret += '0';
                ret += minute.toString() + separator;
                second = time % 60;
                if (second < 10)
                    ret += '0';
                ret += second.toString();
            }
            return ret;
        }
        if (time > this.ONE_DAY) {
            day = Math.floor(time / this.ONE_DAY);
            ret = day + '天';
            time = time - day * this.ONE_DAY;
            if (flag) {
                hour = Math.floor(time / 3600);
                if (hour > 0) {
                    ret += hour + '小时';
                }
                return ret;
            }
        }
        if (time <= 0) {
            ret = ret + '00:00';
            return ret;
        }
        ret = '';
        hour = Math.floor(time / 3600);
        if (hour > 0) {
            if (hour < 10) {
                ret += '0' + hour.toString() + separator;
            }
            else {
                ret += hour.toString() + separator;
            }
        }
        minute = Math.floor((time - hour * 3600) / 60);
        if (minute > 0 || hour > 0) {
            if (minute < 10)
                ret += '0';
            ret += minute.toString() + separator;
        }
        else {
            ret += '00' + separator;
        }
        second = time % 60;
        if (second < 10)
            ret += '0';
        ret += second.toString();
        return ret;
    };
    /**
     * 获取当前月的日历
     * @param mTime 带当前月份的时间
     * @returns
     */
    TimeUtils.getMonthCalendar = function (mTime) {
        if (mTime === void 0) { mTime = moment(); }
        var list = [[]];
        var onD = moment();
        var onMoment = moment(mTime, 'YYYY-MM');
        onMoment.date(1);
        var upMoment = onMoment.clone();
        // 补全上一个月的
        for (var i = upMoment.day() || 7; i > 1; i--) {
            upMoment.add(-1, 'd');
            list[list.length - 1].unshift({
                time: upMoment.clone(),
                mType: 'up',
                today: onD.isSame(upMoment, 'D'),
            });
        }
        // 补全本月
        var onM = onMoment.month();
        while (onM == onMoment.month()) {
            if (list[list.length - 1].length >= 7) {
                list.push([]);
            }
            list[list.length - 1].push({
                time: onMoment.clone(),
                mType: 'on',
                today: onD.isSame(onMoment, 'D'),
            });
            onMoment.add(1, 'd');
        }
        // 补全下一个月
        var nextMoment = onMoment.clone();
        if ((nextMoment.day() || 7) > 1) {
            for (var i = nextMoment.day() || 7; i <= 7; i++) {
                list[list.length - 1].push({
                    time: nextMoment.clone(),
                    mType: 'next',
                    today: onD.isSame(nextMoment, 'D'),
                });
                nextMoment.add(1, 'd');
            }
        }
        return list;
    };
    /**
     * 获取某一周的日历
     * @param time 目标时间
     * @returns
     */
    TimeUtils.getWeekCalendar = function (time) {
        if (time === void 0) { time = moment(); }
        return TimeUtils.getMonthCalendar(time)
            .find(function (_) { return _.some(function (__) { return moment(time).isSame(__.time); }); })
            .map(function (_) {
            return {
                time: _.time,
                today: _.today,
            };
        });
    };
    TimeUtils.ONE_YEAR = 60 * 60 * 24 * 365;
    TimeUtils.ONE_DAY = 60 * 60 * 24;
    return TimeUtils;
}());
export { TimeUtils };
