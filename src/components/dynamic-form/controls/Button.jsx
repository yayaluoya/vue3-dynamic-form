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

  renderRaw() {
    return <el-button>Default</el-button>;
  }
}
