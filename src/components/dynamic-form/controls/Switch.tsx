import { NSwitch } from "naive-ui";
import type {
  IConRenderOp,
  IConRightRenderItemOp,
  IConRightRenderOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";

/**
 * 开关
 */
export class Switch extends BaseForm {
  /** 控件类型 */
  static ConType = "Switch";
  /** 控件名字 */
  static ConName = "开关";
  /** 单例对象 */
  static I = new Switch();

  props = {
    round: true,
    rubberBand: true,
  };

  formDefaultValue = false;

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NSwitch
        v-model:value={ref.value}
        round={this.props.round}
        rubberBand={this.props.rubberBand}
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "圆形按钮",
        editor: <NSwitch v-model:value={this.props.round} />,
      },
      {
        label: "橡皮筋效果",
        editor: <NSwitch v-model:value={this.props.rubberBand} />,
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
