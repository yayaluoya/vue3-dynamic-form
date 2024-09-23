import { NInputNumber } from "naive-ui";
import {
  type IConRightRenderOp,
  type IConRightRenderItemOp,
  BaseCon,
} from "./BaseCon";
import type { IRenderOp } from "../indexDialog";

/**
 * 空白间隔
 */
export class Interval extends BaseCon {
  /** 控件类型 */
  static ConType = "Interval";
  /** 控件名字 */
  static ConName = "空白间隔";
  /** 单例对象 */
  static I = new Interval();

  props = {
    height: 25,
  };

  renderRaw({ formData }: IRenderOp) {
    return (
      <div
        style={`
            width: 100%;
            height: ${this.props.height}px;
            ${formData ? "" : "border: 1px dashed var(--borderColor);"}
        `}
      ></div>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "高度",
        editor: <NInputNumber v-model:value={this.props.height} min={10} />,
      },
    ];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
