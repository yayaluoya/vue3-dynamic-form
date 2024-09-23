import { BaseCon } from "./controls/BaseCon";
import * as conms from "./controls";
import { ObjectUtils } from "./tool/obj/ObjectUtils";

/** 默认控件列表 */
const Cons = Object.values(conms);

/**
 * 控件工具
 */
export class ConT {
  /**
   * 通过控件类型获取控件实例
   * @param conType
   * @param cons_ 扩展控件
   */
  static byConTypeGetCon(conType: string, Cons_: (typeof BaseCon)[] = []) {
    let C = [...Cons, ...Cons_].find((_) => _.ConType == conType);
    if (!C) {
      throw `找不到conType:${conType}`;
    }
    return new C() as BaseCon;
  }

  /**
   * 通过配置文件获取组件列表
   * @param configs
   * @param Cons_ 扩展控件
   */
  static toCons(configs: any[], Cons_: (typeof BaseCon)[] = []): BaseCon[] {
    return configs.map((_) =>
      ConT.byConTypeGetCon(_.conType, Cons_).initConfig(
        _,
        (configs_: any[], __: (typeof BaseCon)[] = []) =>
          ConT.toCons(configs_, [...Cons_, ...__])
      )
    );
  }

  /**
   * 转成配置对象
   * @param cons 控件列表
   */
  static toConfigs(cons: BaseCon[]): any[] {
    return JSON.parse(JSON.stringify(cons));
  }

  /**
   * 获取表单对象
   * @param cons 控件列表
   */
  static getFromData(cons: BaseCon[]) {
    let fromData: Record<string, any> = {};
    BaseCon.consForeach(cons, (_) => {
      if (_ instanceof conms.BaseForm) {
        let formItemProp = _.getFormItemProps();
        formItemProp.path &&
          (fromData[_.getFormItemProps().path!] = ObjectUtils.clone2(
            _.formDefaultValue
          ));
      }
    });
    return fromData;
  }
}
