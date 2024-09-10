import { BaseCon } from "./BaseCon";

/**
 * 标签页
 */
export class LabelPage extends BaseCon {
  /** 控件类型 */
  static ConType = "LabelPage";
  /** 控件名字 */
  static ConName = "标签页";
  /** 单例对象 */
  static I = new LabelPage();

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw() {
    return <div></div>;
  }
}
