import { encode, decode, encodeURL } from 'js-base64';
/**
 * Base64 工具
 */
var Base64 = /** @class */ (function () {
    function Base64() {
    }
    /**
     * 将utf-8编码的字符串转换为Base64字符串。
     * @param src
     * @param urlsafe 如果 true 则结果是url安全的
     */
    Base64.encode = function (src, urlsafe) {
        return encode(src, urlsafe);
    };
    /**
     * 将utf-8编码的字符串转换为url安全的Base64 RFC4648 §5.
     */
    Base64.encodeURL = function (src) {
        return encodeURL(src);
    };
    /**
     * 将Base64字符串转换为UTF-8字符串。
     * @param {String} src Base64字符串。支持普通和url安全
     */
    Base64.decode = function (src) {
        return decode(src);
    };
    return Base64;
}());
export { Base64 };
