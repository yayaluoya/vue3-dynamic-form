/**
 * json解析
 * 如果解析出错了会返回默认值
 * @param str
 * @param def
 * @param reviver
 */
export function JSONPar(str, def, reviver) {
    try {
        return JSON.parse(str, reviver);
    }
    catch (_a) {
        return def;
    }
}
