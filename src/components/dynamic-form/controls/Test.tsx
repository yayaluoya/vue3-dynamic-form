import { BaseCon, type IConRenderOp } from "./BaseCon";
import "../style/test.scss";
import { FormItemCon } from "../com/FormItemCon";

class FormItemCon_ extends FormItemCon {
  render() {
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

  init(config: Partial<Test>) {
    this.formItem = new FormItemCon_(config?.formItem || this.formItem);
  }

  renderRaw({ formData }: IConRenderOp) {
    let { value } = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ test">
        测试控件
        <div style={`display: flex;`}>
          number:{" "}
          <el-input-number
            size="small"
            model-value={value.number}
            onChange={(v: any) => {
              value.number = v;
            }}
          />
        </div>
        <div style={`display: flex;`}>
          str:{" "}
          <el-input
            model-value={value.str}
            onInput={(v: any) => {
              value.str = v;
            }}
          />
        </div>
      </div>
    );
  }
}
