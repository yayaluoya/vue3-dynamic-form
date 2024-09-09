import moment from 'moment';
/**
 * 时间工具
 */
export declare class TimeUtils {
    static ONE_YEAR: number;
    static ONE_DAY: number;
    /**
     * 格式
     * TODO 可重写
     */
    static get format(): string;
    /**
     * 获取时间
     * @param op
     * @returns
     */
    static getTime(op: moment.MomentInput): string;
    static makeTimeLeftString(time: number, separator?: string, flag?: Boolean): string;
    /**
     * 获取当前月的日历
     * @param mTime 带当前月份的时间
     * @returns
     */
    static getMonthCalendar(mTime?: moment.MomentInput): {
        /** 数据 */
        time: moment.Moment;
        /** 月类型 上月 当月 下月 */
        mType: "up" | "on" | "next";
        /** 是否是今天 */
        today: boolean;
    }[][];
    /**
     * 获取某一周的日历
     * @param time 目标时间
     * @returns
     */
    static getWeekCalendar(time?: moment.MomentInput): {
        time: moment.Moment;
        today: boolean;
    }[];
}
//# sourceMappingURL=TimeUtils.d.ts.map