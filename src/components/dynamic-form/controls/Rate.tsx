import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";
import { NColorPicker, NInputNumber, NRate, NSwitch } from "naive-ui";
import { predefineColors } from "../config/predefineColors";

/**
 * 评分
 */
export class Rate extends BaseForm {
  /** 控件类型 */
  static ConType = "Rate";
  /** 控件名字 */
  static ConName = "评分";
  /** 单例对象 */
  static I = new Rate();

  props = {
    allowHalf: false,
    clearable: false,
    color: "",
    count: 5,
  };

  formDefaultValue = 0;

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NRate
        v-model:value={ref.value}
        allowHalf={this.props.allowHalf}
        clearable={this.props.clearable}
        color={this.props.color}
        count={this.props.count}
      ></NRate>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "允许半选",
        editor: <NSwitch v-model:value={this.props.allowHalf} />,
      },
      {
        label: "可清除",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "图标个数",
        editor: <NInputNumber v-model:value={this.props.count} />,
      },
      {
        label: "已激活图标颜色",
        editor: (
          <NColorPicker
            v-model:value={this.props.color}
            swatches={predefineColors}
          />
        ),
      },
    ];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
