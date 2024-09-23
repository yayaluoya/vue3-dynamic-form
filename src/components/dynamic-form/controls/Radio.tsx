import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { NRadio, NRadioButton, NRadioGroup, NSwitch } from "naive-ui";
import { BaseOption } from "./BaseOption";

/**
 * 单选框
 */
export class Radio extends BaseOption {
  /** 控件类型 */
  static ConType = "Radio";
  /** 控件名字 */
  static ConName = "单选框";
  /** 单例对象 */
  static I = new Radio();

  props = {
    button: false,
  };

  formDefaultValue = "";

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NRadioGroup v-model:value={ref.value}>
        {this.list.map((_) => {
          if (this.props.button) {
            return (
              <NRadioButton
                key={_.key}
                value={_.value}
                disabled={!_.activate}
                label={_.label}
              ></NRadioButton>
            );
          }
          return (
            <NRadio
              key={_.key}
              value={_.value}
              disabled={!_.activate}
              label={_.label}
            ></NRadio>
          );
        })}
      </NRadioGroup>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "按钮样式",
        editor: <NSwitch v-model:value={this.props.button} />,
      },
      ...this.getRightOptionEditor(),
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
