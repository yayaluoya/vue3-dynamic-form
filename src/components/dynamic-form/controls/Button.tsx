import { predefineColors } from "../config/predefineColors";
import "../style/button.scss";
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

  props = {
    size: "",
    type: "",
    align: "left",
    text: false,
    disabled: false,
    plain: false,
    circle: false,
    color: "",
    margin: {
      left: 0,
      right: 0,
    },
  };
  buttonText = "按钮";

  renderRaw() {
    return (
      <div
        class="controls__ button"
        style={`
          text-align: ${this.props.align};
        `}
      >
        <el-button
          size={this.props.size}
          type={this.props.type}
          text={this.props.text}
          disabled={this.props.disabled}
          plain={this.props.plain}
          circle={this.props.circle}
          color={this.props.color}
          style={`
            margin-left: ${this.props.margin.left}px;
            margin-right: ${this.props.margin.right}px;
            `}
        >
          {this.buttonText}
        </el-button>
      </div>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "文字",
        editor: (
          <el-input
            size="small"
            model-value={this.buttonText}
            onInput={(v: any) => {
              this.buttonText = v;
            }}
          />
        ),
      },
      {
        label: "类型",
        editor: (
          <el-select
            model-value={this.props.type}
            size="small"
            onChange={(v: any) => {
              this.props.type = v;
            }}
            placeholder="请选择"
            clearable
          >
            <el-option label="primary" value="primary" />
            <el-option label="success" value="success" />
            <el-option label="warning" value="warning" />
            <el-option label="danger" value="danger" />
            <el-option label="info" value="info" />
          </el-select>
        ),
      },
      {
        label: "文字按钮",
        editor: (
          <el-switch
            size="small"
            model-value={this.props.text}
            onChange={(v: any) => {
              this.props.text = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "朴素按钮",
        editor: (
          <el-switch
            size="small"
            model-value={this.props.plain}
            onChange={(v: any) => {
              this.props.plain = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "圆形按钮",
        editor: (
          <el-switch
            size="small"
            model-value={this.props.circle}
            onChange={(v: any) => {
              this.props.circle = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "颜色",
        editor: (
          <el-color-picker
            model-value={this.props.color}
            onChange={(v: any) => {
              this.props.color = v;
            }}
            predefine={predefineColors}
            size="small"
          />
        ),
      },
      {
        label: "大小",
        editor: (
          <el-select
            model-value={this.props.size}
            size="small"
            onChange={(v: any) => {
              this.props.size = v;
            }}
            placeholder="请选择"
            clearable
          >
            <el-option label="large" value="large" />
            <el-option label="default" value="default" />
            <el-option label="small" value="small" />
          </el-select>
        ),
      },
      {
        label: "对齐方式",
        editor: (
          <el-radio-group
            size="small"
            model-value={this.props.align}
            onChange={(v: any) => {
              this.props.align = v;
            }}
          >
            <el-radio-button label="left" value="left" />
            <el-radio-button label="center" value="center" />
            <el-radio-button label="right" value="right" />
          </el-radio-group>
        ),
      },
      {
        label: "左间隔",
        editor: (
          <el-input-number
            size="small"
            step={5}
            model-value={this.props.margin.left}
            onChange={(v: any) => {
              this.props.margin.left = v;
            }}
          />
        ),
      },
      {
        label: "右间隔",
        editor: (
          <el-input-number
            size="small"
            step={5}
            model-value={this.props.margin.right}
            onChange={(v: any) => {
              this.props.margin.right = v;
            }}
          />
        ),
      },
      {
        label: "是否禁用",
        editor: (
          <el-switch
            size="small"
            step={5}
            model-value={this.props.disabled}
            onChange={(v: any) => {
              this.props.disabled = v;
            }}
          ></el-switch>
        ),
      },
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
