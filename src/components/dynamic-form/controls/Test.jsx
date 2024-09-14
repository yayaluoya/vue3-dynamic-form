import { BaseCon } from "./BaseCon";
import "../style/test.scss";
import { FormItemRules } from "../com/FormItemRules";

class FormItemRules_ extends FormItemRules {
  reder() {
    return [];
  }
}

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

  /**
   * @param {Test} config
   */
  init(config) {
    this.formItemRules = new FormItemRules_(config?.formItemRules);
  }

  renderRaw({ formData }) {
    let { value } = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ test">
        测试控件
        <div style={`display: flex;`}>
          number:{" "}
          <el-input-number
            size="small"
            model-value={value.number}
            onChange={(v) => {
              value.number = v;
            }}
          />
        </div>
        <div style={`display: flex;`}>
          str:{" "}
          <el-input
            model-value={value.str}
            onInput={(v) => {
              value.str = v;
            }}
          />
        </div>
      </div>
    );
  }
}
