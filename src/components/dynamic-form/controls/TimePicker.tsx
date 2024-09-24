import { NInput, NSwitch, NTimePicker } from "naive-ui";
import type {
  IConRenderOp,
  IConRightRenderItemOp,
  IConRightRenderOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";

/**
 * 时间选择器
 */
export class TimePicker extends BaseForm {
  /** 控件类型 */
  static ConType = "TimePicker";
  /** 控件名字 */
  static ConName = "时间选择器";
  /** 单例对象 */
  static I = new TimePicker();

  props: {
    clearable: boolean;
    format: string;
    placeholder: string;
  } = {
    clearable: false,
    format: "HH:mm:ss",
    placeholder: "",
  };

  formDefaultValue = Date.now();

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NTimePicker
        v-model:value={ref.value}
        clearable={this.props.clearable}
        format={this.props.format}
        placeholder={this.props.placeholder || undefined}
      ></NTimePicker>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "可清除",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "格式",
        editor: <NInput v-model:value={this.props.format} />,
      },
      {
        label: "占位字符串",
        editor: <NInput v-model:value={this.props.placeholder} />,
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
