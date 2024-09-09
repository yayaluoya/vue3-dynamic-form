/**
 * 剪切板工具
 */
var Clipboard = /** @class */ (function () {
    function Clipboard() {
    }
    /**
     * 设置一段字符串到剪切板
     * @param _str 需要复制的字符串
     */
    Clipboard.set = function (_str) {
        return new Promise(function (r, e) {
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(_str)
                    .then(function () {
                    r(true);
                })
                    .then(function () {
                    r(false);
                });
            }
            else {
                try {
                    var input = document.createElement('input');
                    input.value = _str;
                    document.body.append(input);
                    input.select();
                    document.execCommand('copy');
                    input.remove();
                    r(true);
                }
                catch (_a) {
                    r(false);
                }
            }
        });
    };
    /**
     * 从剪切板获取内容
     */
    Clipboard.get = function () {
        return new Promise(function (r, e) {
            if (navigator.clipboard) {
                navigator.clipboard
                    .readText()
                    .then(function (value) {
                    r(value);
                })
                    .then(function () {
                    r('');
                });
            }
            else {
                r('');
            }
        });
    };
    return Clipboard;
}());
export { Clipboard };
