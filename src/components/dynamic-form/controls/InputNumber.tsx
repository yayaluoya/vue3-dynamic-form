import {
  NCheckbox,
  NFlex,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch,
  type InputNumberProps,
} from "naive-ui";
import {
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { ArrayUtils } from "../tool/ArrayUtils";
import { BaseForm } from "./BaseForm";

/**
 * 数字输入框
 */
export class InputNumber extends BaseForm {
  /** 控件类型 */
  static ConType = "InputNumber";
  /** 控件名字 */
  static ConName = "计数器";
  /** 单例对象 */
  static I = new InputNumber();

  props: {
    placeholder: string;
    bordered: boolean;
    clearable: boolean;
    max: number;
    min: number;
    showButton: boolean;
    buttonPlacement: InputNumberProps["buttonPlacement"];
    step: number;
  } = {
    placeholder: "",
    bordered: true,
    clearable: false,
    max: 100,
    min: 0,
    showButton: true,
    buttonPlacement: "right",
    step: 1,
  };

  enableProps: ("max" | "min")[] = [];

  formDefaultValue = 0;

  constructor() {
    super();
    this.addRule({
      type: "number",
      message: "",
    });
  }

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NInputNumber
        v-model:value={ref.value}
        placeholder={this.props.placeholder}
        bordered={this.props.bordered}
        clearable={this.props.clearable}
        max={this.enableProps.includes("max") ? this.props.max : undefined}
        min={this.enableProps.includes("min") ? this.props.min : undefined}
        showButton={this.props.showButton}
        buttonPlacement={this.props.buttonPlacement}
        step={this.props.step}
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "占位字符串",
        editor: <NInput v-model:value={this.props.placeholder} />,
      },
      {
        label: "最大值",
        editor: (
          <NFlex align="center" wrap={false}>
            <NCheckbox
              size="small"
              checked={this.enableProps.includes("max")}
              onUpdate:checked={(v) => {
                v
                  ? this.enableProps.push("max")
                  : ArrayUtils.eliminate(this.enableProps, "max");
              }}
            ></NCheckbox>
            <NInputNumber v-model:value={this.props.max} />
          </NFlex>
        ),
      },
      {
        label: "最小值",
        editor: (
          <NFlex align="center" wrap={false}>
            <NCheckbox
              size="small"
              checked={this.enableProps.includes("min")}
              onUpdate:checked={(v) => {
                v
                  ? this.enableProps.push("min")
                  : ArrayUtils.eliminate(this.enableProps, "min");
              }}
            ></NCheckbox>
            <NInputNumber v-model:value={this.props.min} />
          </NFlex>
        ),
      },
      {
        label: "边框",
        editor: <NSwitch v-model:value={this.props.bordered} />,
      },
      {
        label: "步数",
        editor: <NInputNumber v-model:value={this.props.step} />,
      },
      {
        label: "可清除",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "使用加减按钮",
        editor: <NSwitch v-model:value={this.props.showButton} />,
      },
      {
        label: "控制按钮位置",
        editor: (
          <NSelect
            v-model:value={this.props.buttonPlacement}
            placeholder="请选择"
            options={[
              { label: "right", value: "right" },
              { label: "both", value: "both" },
            ]}
          />
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
