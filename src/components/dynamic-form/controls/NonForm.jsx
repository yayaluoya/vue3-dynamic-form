import { BaseCon } from "./BaseCon";

/**
 * 非表单控件基类
 */
export class NonForm extends BaseCon {
  constructor() {
    super();
    this.formItem.prop = undefined;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...super.toJSON() };
    delete d.formItem;
    return d;
  }

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  getRight() {
    let _ = super.getRight(...arguments).filter((_) => _.key != "form");
    return _;
  }
}
