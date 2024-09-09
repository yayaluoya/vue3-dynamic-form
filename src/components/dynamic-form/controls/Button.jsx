import { BaseCon } from "./BaseCon";

/**
 * 按钮
 */
export class Button extends BaseCon {
  /** 单例对象 */
  static I = new Button();
  /** 控件类型 */
  static type = "button";
  /** 控件名字 */
  static name = "按钮";

  renderRaw(h, { ctx = undefined } = {}) {
    return <el-button>Default</el-button>;
  }
}
