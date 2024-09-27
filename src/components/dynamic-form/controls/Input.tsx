import {
  NInput,
  NInputNumber,
  NSelect,
  NSwitch,
  type InputProps,
} from "naive-ui";
import {
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";

/**
 * 输入框
 */
export class Input extends BaseForm {
  /** 控件类型 */
  static ConType = "Input";
  /** 控件名字 */
  static ConName = "输入框";
  /** 单例对象 */
  static I = new Input();

  props: {
    type: InputProps["type"];
    placeholder: string;
    clearable: boolean;
    maxlength: number;
    rows: number;
    showCount: boolean;
  } = {
    type: "text",
    placeholder: "",
    clearable: false,
    maxlength: 0,
    rows: 3,
    showCount: false,
  };

  formDefaultValue = "";

  constructor() {
    super();
    this.addRule({
      type: "string",
      message: "",
      required: false,
    });
  }

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NInput
        v-model:value={ref.value}
        type={this.props.type}
        placeholder={this.props.placeholder}
        clearable={this.props.clearable}
        maxlength={this.props.maxlength ? this.props.maxlength : undefined}
        rows={this.props.rows}
        showCount={this.props.showCount}
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "类型",
        editor: (
          <NSelect
            v-model:value={this.props.type}
            placeholder="请选择"
            options={[
              { label: "text", value: "text" },
              { label: "textarea", value: "textarea" },
              { label: "password", value: "password" },
            ]}
          />
        ),
      },
      {
        label: "空白占位符",
        editor: <NInput v-model:value={this.props.placeholder} />,
      },
      {
        label: "可清空",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "最大输入长度",
        editor: <NInputNumber v-model:value={this.props.maxlength} />,
      },
      this.props.type == "textarea"
        ? {
            label: "输入框行数",
            editor: <NInputNumber v-model:value={this.props.rows} />,
          }
        : undefined,
      {
        label: "显示字数统计",
        editor: <NSwitch v-model:value={this.props.showCount} />,
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
