/**
 * 数学函数扩展
 */
export declare class MathUtils {
    static Deg2Rad: number;
    static Rad2Deg: number;
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
    static scaleTransform(num: number, radix?: number): string;
    static RandomFromWithWeight<T>(numArr: T[], weightArr: number[]): T;
    /**
     * 获取min~max之间的一个整数
     * @param min
     * @param max
     * @returns
     */
    static RandomInt(min: number, max: number): number;
    /**
     * 获取一个随机数min~max之间的一个随机数
     * @param min
     * @param max
     * @returns
     */
    static Random(min: number, max: number): number;
    /**
     * 获取一个范围内随机整数
     * @param min 最小值
     * @param max 最大值
     */
    static randomRangeInt(min: number, max: number): number;
    /**
     * 判定概率命中
     * @param ratio 概率，百分数
     */
    static RandomRatio(ratio: number): boolean;
    static Clamp(value: number, min: number, max: number): number;
    static Clamp01(value: number): number;
    /**
     * 获取符号
     * @param value
     * @returns
     */
    static Sign(value: number): number;
    static GetNumCount(num: number): number;
    static Lerp(from: number, to: number, progress: number): number;
    static MoveTowardsAngle(current: number, target: number, maxDelta: number): number;
    static MoveTowards(current: number, target: number, maxDelta: number): number;
    static DeltaAngle(current: number, target: number): number;
    static Repeat(t: number, length: number): number;
    static IsSimilar(n1: number, n2: number): boolean;
}
//# sourceMappingURL=MathUtils.d.ts.map