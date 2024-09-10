import { BaseCon } from "./BaseCon";

/**
 * 卡片
 */
export class Card extends BaseCon {
  /** 控件类型 */
  static ConType = "Card";
  /** 控件名字 */
  static ConName = "卡片";
  /** 单例对象 */
  static I = new Card();

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw() {
    return <div></div>;
  }
}
