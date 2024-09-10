import { BaseCon } from "./BaseCon";

/**
 * 栅格
 */
export class Grid extends BaseCon {
  /** 控件类型 */
  static ConType = "Grid";
  /** 控件名字 */
  static ConName = "栅格";
  /** 单例对象 */
  static I = new Grid();

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw() {
    return <div></div>;
  }
}
