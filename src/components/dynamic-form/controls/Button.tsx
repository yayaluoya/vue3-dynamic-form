import {
  NButton,
  NColorPicker,
  NFlex,
  NSelect,
  NSwitch,
  type ButtonProps,
  type FlexProps,
} from "naive-ui";
import { predefineColors } from "../config/predefineColors";
import type { IConRightRenderOp, IConRightReterItemOp } from "./BaseCon";
import { NonForm } from "./NonForm";

/**
 * 按钮
 */
export class Button extends NonForm {
  /** 控件类型 */
  static ConType = "Button";
  /** 控件名字 */
  static ConName = "按钮";
  /** 单例对象 */
  static I = new Button();

  props: {
    type: ButtonProps["type"];
    size: ButtonProps["size"];
    block: boolean;
    bordered: boolean;
    circle: boolean;
    color: ButtonProps["color"];
    dashed: boolean;
    ghost: boolean;
    quaternary: boolean;
    round: boolean;
    secondary: boolean;
    strong: boolean;
    tertiary: boolean;
    text: boolean;
    textColor: ButtonProps["textColor"];
    justify: FlexProps["justify"];
  } = {
    type: "default",
    size: "medium",
    block: false,
    bordered: true,
    circle: false,
    color: "",
    dashed: false,
    ghost: false,
    quaternary: false,
    round: false,
    secondary: false,
    strong: false,
    tertiary: false,
    text: false,
    textColor: "",
    justify: "start",
  };
  buttonText = "按钮";

  renderRaw() {
    return (
      <NFlex justify={this.props.justify}>
        <NButton
          type={this.props.type}
          size={this.props.size}
          block={this.props.block}
          bordered={this.props.bordered}
          circle={this.props.circle}
          color={this.props.color}
          dashed={this.props.dashed}
          ghost={this.props.ghost}
          quaternary={this.props.quaternary}
          round={this.props.round}
          secondary={this.props.secondary}
          strong={this.props.strong}
          tertiary={this.props.tertiary}
          text={this.props.text}
          textColor={this.props.textColor}
        >
          {this.buttonText}
        </NButton>
      </NFlex>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "类型",
        editor: (
          <NSelect
            v-model:value={this.props.type}
            placeholder="请选择"
            options={[
              { label: "default", value: "default" },
              { label: "tertiary", value: "tertiary" },
              { label: "primary", value: "primary" },
              { label: "info", value: "info" },
              { label: "success", value: "success" },
              { label: "warning", value: "warning" },
              { label: "error", value: "error" },
            ]}
            onChange={() => {
              this.props.color = "";
              this.props.textColor = "";
            }}
          />
        ),
      },
      {
        label: "尺寸",
        editor: (
          <NSelect
            v-model:value={this.props.size}
            placeholder="请选择"
            options={[
              { label: "tiny", value: "tiny" },
              { label: "small", value: "small" },
              { label: "medium", value: "medium" },
              { label: "large", value: "large" },
            ]}
          />
        ),
      },
      {
        label: "对齐方式",
        editor: (
          <NSelect
            v-model:value={this.props.justify}
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
        label: "显示为块级",
        editor: <NSwitch v-model:value={this.props.block} />,
      },
      {
        label: "显示 border",
        editor: <NSwitch v-model:value={this.props.bordered} />,
      },
      {
        label: "圆形",
        editor: <NSwitch v-model:value={this.props.circle} />,
      },
      {
        label: "按钮颜色",
        editor: (
          <NColorPicker
            v-model:value={this.props.color}
            swatches={predefineColors}
          />
        ),
      },
      {
        label: "虚线边框",
        editor: <NSwitch v-model:value={this.props.dashed} />,
      },
      {
        label: "透明",
        editor: <NSwitch v-model:value={this.props.ghost} />,
      },
      {
        label: "四级按钮",
        editor: <NSwitch v-model:value={this.props.quaternary} />,
      },
      {
        label: "显示圆角",
        editor: <NSwitch v-model:value={this.props.round} />,
      },
      {
        label: "次要按钮",
        editor: <NSwitch v-model:value={this.props.secondary} />,
      },
      {
        label: "文字加粗",
        editor: <NSwitch v-model:value={this.props.strong} />,
      },
      {
        label: "三级按钮",
        editor: <NSwitch v-model:value={this.props.tertiary} />,
      },
      {
        label: "文本按钮",
        editor: <NSwitch v-model:value={this.props.text} />,
      },
      {
        label: "文字颜色",
        editor: (
          <NColorPicker
            v-model:value={this.props.textColor}
            swatches={predefineColors}
          />
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
