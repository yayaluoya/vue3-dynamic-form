import { BaseCon } from "./BaseCon";

/**
 * 布局控件
 */
export class Layout extends BaseCon {
  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  getRight() {
    let _ = super.getRight(...arguments).filter((_) => _.title != "表单属性");
    return _;
  }
}
