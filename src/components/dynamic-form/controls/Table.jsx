import { BaseCon } from "./BaseCon";

/**
 * 表格
 */
export class Table extends BaseCon {
  /** 控件类型 */
  static ConType = "Table";
  /** 控件名字 */
  static ConName = "表格";
  /** 单例对象 */
  static I = new Table();

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw() {
    return <div></div>;
  }
}
