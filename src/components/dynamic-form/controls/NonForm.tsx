import { BaseCon, type IConRenderOp, type IConRightRenderOp } from "./BaseCon";

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

  renderFormItem(op: IConRenderOp) {
    return this.renderRaw(op);
  }

  getRight(op: IConRightRenderOp, hasEditor = true) {
    let _ = super.getRight(op, hasEditor).filter((_) => _.key != "form");
    return _;
  }
}
