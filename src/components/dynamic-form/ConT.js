import { BaseCon } from "./controls/BaseCon";
import * as conms from "./controls";
import { ObjectUtils } from "./tool/obj/ObjectUtils";

const Cons = Object.values(conms);

/**
 * 控件工具
 */
export class ConT {
  /**
   * 通过控件类型获取控件实例
   * @param {string} conType
   * @param {any[]} cons_ 扩展控件
   * @returns {BaseCon}
   */
  static byConTypeGetCon(conType, Cons_ = []) {
    let C = [...Cons, ...Cons_].find((_) => _.ConType == conType);
    if (!C) {
      throw `找不到conType:${conType}`;
    }
    return new C();
  }

  /**
   * 通过配置文件获取组件列表
   * @param {any[]} configs
   * @param {any[]} Cons_ 扩展控件
   * @returns {BaseCon[]}
   */
  static toCons(configs, Cons_ = []) {
    return configs.map((_) =>
      ConT.byConTypeGetCon(_.conType, Cons_).initConfig(
        _,
        (configs_, __ = []) => ConT.toCons(configs_, [...Cons_, ...__])
      )
    );
  }

  /**
   * 转成配置对象
   * @param {BaseCon[]} cons 控件列表
   */
  static toConfigs(cons) {
    return JSON.parse(JSON.stringify(cons));
  }

  /**
   * 获取表单对象
   * @param {BaseCon[]} cons 控件列表
   */
  static getFromData(cons) {
    let fromData = {};
    BaseCon.consForeach(cons, (_) => {
      _.getFormProp() &&
        (fromData[_.getFormProp()] = ObjectUtils.clone2(_.formDefaultValue));
    });
    return fromData;
  }
}
