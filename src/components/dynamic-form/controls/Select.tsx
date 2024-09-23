import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { BaseOption } from "./BaseOption";
import { NInput, NSelect, NSwitch } from "naive-ui";

/**
 * 选择器
 */
export class Select extends BaseOption {
  /** 控件类型 */
  static ConType = "Select";
  /** 控件名字 */
  static ConName = "选择器";
  /** 单例对象 */
  static I = new Select();

  props = {
    clearable: false,
    placeholder: "",
    filterable: false,
    multiple: false,
  };

  formDefaultValue: string | string[] = "";

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NSelect
        v-model:value={ref.value}
        clearable={this.props.clearable}
        placeholder={this.props.placeholder}
        filterable={this.props.filterable}
        multiple={this.props.multiple}
        options={this.list.map((_) => {
          return {
            label: _.label,
            value: _.value,
            disabled: !_.activate,
          };
        })}
      ></NSelect>
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
        label: "多选",
        editor: (
          <NSwitch
            value={this.props.multiple}
            onUpdate:value={(v) => {
              v ? (this.formDefaultValue = []) : (this.formDefaultValue = "");
              this.props.multiple = v;
            }}
          />
        ),
      },
      {
        label: "可清除",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "可过滤",
        editor: <NSwitch v-model:value={this.props.filterable} />,
      },
      ...this.getRightOptionEditor(),
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
