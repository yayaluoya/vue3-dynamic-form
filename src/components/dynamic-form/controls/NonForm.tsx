import { BaseCon, type IConRenderOp, type IConRightRenderOp } from "./BaseCon";

/**
 * 非表单控件基类
 */
export class NonForm extends BaseCon {
  constructor() {
    super();
    this.formItem.path = undefined;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...super.toJSON() } as any;
    delete d.formItem;
    return d;
  }

  renderFormItem(op: IConRenderOp) {
    return this.renderRaw(op);
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op).filter((_) => _.key != "form");
    return _;
  }
}
