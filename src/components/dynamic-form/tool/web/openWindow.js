/**
 * 打开一个新页面
 * @param url 页面地址
 * @param opt 选项
 */
export function openWindow(url, opt) {
    var _a = opt || {}, _b = _a.target, target = _b === void 0 ? '__blank' : _b, _c = _a.noopener, noopener = _c === void 0 ? true : _c, _d = _a.noreferrer, noreferrer = _d === void 0 ? true : _d;
    var feature = [];
    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');
    window.open(url, target, feature.join(','));
}
