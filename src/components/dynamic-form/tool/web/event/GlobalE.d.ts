import { BaseEvent } from '../../BaseEvent';
/**
 * 全局事件
 * 只实现了几个常用事件
 */
export declare class GlobalE<T extends string = never> extends BaseEvent<'load' | 'message' | 'resize' | 'beforeunload' | 'blur' | 'focus' | 'hashchange' | 'storage' | T> {
    /** 单例 */
    static readonly instance: GlobalE;
    /** 单例 */
    static readonly I: GlobalE;
    constructor();
}
//# sourceMappingURL=GlobalE.d.ts.map