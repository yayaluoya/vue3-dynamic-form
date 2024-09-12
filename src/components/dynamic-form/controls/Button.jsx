import { BaseCon } from "./BaseCon";

/**
 * 按钮
 */
export class Button extends BaseCon {
  /** 控件类型 */
  static ConType = "Button";
  /** 控件名字 */
  static ConName = "按钮";
  /** 单例对象 */
  static I = new Button();

  constructor() {
    super();
    this.formItemProps.prop = undefined;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...super.toJSON() };
    delete d.formItemProps;
    return d;
  }

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw() {
    return <el-button>Default</el-button>;
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments).filter((_) => _.title != "表单属性");
    hasEditor && _.find((_) => _.title == "常用属性").childs.push(...[]);
    return _;
  }
}
