import { NonForm } from "./NonForm";
import {
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightReterItemOp,
} from "./BaseCon";
import { NFlex, NInput, NSelect, NText, type FlexProps } from "naive-ui";

/**
 * 文字
 */
export class Text extends NonForm {
  /** 控件类型 */
  static ConType = "Text";
  /** 控件名字 */
  static ConName = "文字";
  /** 单例对象 */
  static I = new Text();

  props: {
    align: FlexProps["align"];
    style: string;
  } = {
    align: "start",
    style: "",
  };

  text = "文字";

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NFlex vertical align={this.props.align} style={`width: 100%`}>
        {this.text
          .split(/\n/g)
          .filter(Boolean)
          .map((_) => {
            return <NText style={this.props.style}>{_}</NText>;
          })}
      </NFlex>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "对齐方式",
        editor: (
          <NSelect
            v-model:value={this.props.align}
            placeholder="请选择"
            options={[
              { label: "start", value: "start" },
              { label: "center", value: "center" },
              { label: "end", value: "end" },
            ]}
          />
        ),
      },
      {
        label: "文字内容",
        editor: <NInput v-model:value={this.text} type="textarea" />,
      },
      {
        label: "文字样式",
        editor: <NInput v-model:value={this.props.style} type="textarea" />,
      },
    ];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
