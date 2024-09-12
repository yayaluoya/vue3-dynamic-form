import { BaseCon } from "./BaseCon";
import "../style/test.scss";

/**
 * 测试
 */
export class Test extends BaseCon {
  /** 控件类型 */
  static ConType = "Test";
  /** 控件名字 */
  static ConName = "测试";
  /** 单例对象 */
  static I = new Test();

  formDefaultValue = {
    number: 1,
    str: "字符串",
  };

  renderRaw({ formData }) {
    let { value } = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ test">
        测试控件
        <span>number: {value.number}</span>
        <span>str: {value.str}</span>
      </div>
    );
  }
}
