import { BaseCon } from "./BaseCon";

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
    a: 1,
    b: "字符串",
  };

  renderRaw({ formData }) {
    let { value } = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div>
        <span>a: {value.a}</span>
        <span>b: {value.b}</span>
        <el-button>Default</el-button>
      </div>
    );
  }
}
