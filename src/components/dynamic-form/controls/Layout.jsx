import { BaseCon } from "./BaseCon";

/**
 * 布局控件
 */
export class Layout extends BaseCon {
  constructor() {
    super();
    this.formItemProps.prop = undefined;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...super.toJSON() };
    delete d.formItemProps;
    delete d.formItemRules;
    delete d.formItemLabelFontStyle;
    return d;
  }

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  getRight() {
    let _ = super.getRight(...arguments).filter((_) => _.title != "表单属性");
    return _;
  }
}
