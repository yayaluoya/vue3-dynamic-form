import { predefineColors } from "../config/predefineColors";
import { BaseCon } from "./BaseCon";

/**
 * 按钮
 */
export class Button extends BaseCon {
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

  constructor() {
    super();
    this.formItemProps.prop = undefined;
  }

  /** 转JSON字符串 */
  toJSON() {
    let d = { ...super.toJSON() };
    delete d.formItemProps;
    delete d.formItemRules;
    delete d.formItemLabelFontStyle;
    return d;
  }

  renderFormItem() {
    return this.renderRaw(...arguments);
  }

  renderRaw() {
    return (
      <div style={`text-align: ${this.props.align}`}>
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

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments).filter((_) => _.title != "表单属性");
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "文字",
            editor: (
              <el-input
                size="small"
                model-value={this.buttonText}
                onInput={(v) => {
                  this.buttonText = v;
                }}
              />
            ),
          },
          {
            label: "类型",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.type}
                onChange={(v) => {
                  this.props.type = v;
                }}
              >
                <el-radio-button label="default" value="" />
                <el-radio-button label="primary" value="primary" />
                <el-radio-button label="success" value="success" />
                <el-radio-button label="warning" value="warning" />
                <el-radio-button label="danger" value="danger" />
                <el-radio-button label="info" value="info" />
              </el-radio-group>
            ),
          },
          {
            label: "文字按钮",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.text}
                onChange={(v) => {
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
                onChange={(v) => {
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
                onChange={(v) => {
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
                onChange={(v) => {
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
              <el-radio-group
                size="small"
                model-value={this.props.size}
                onChange={(v) => {
                  this.props.size = v;
                }}
              >
                <el-radio-button label="large" value="large" />
                <el-radio-button label="default" value="default" />
                <el-radio-button label="small" value="small" />
              </el-radio-group>
            ),
          },
          {
            label: "对齐方式",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.align}
                onChange={(v) => {
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
                model-value={this.props.margin.left}
                onChange={(_) => {
                  this.props.margin.left = _;
                }}
              />
            ),
          },
          {
            label: "右间隔",
            editor: (
              <el-input-number
                size="small"
                model-value={this.props.margin.right}
                onChange={(_) => {
                  this.props.margin.right = _;
                }}
              />
            ),
          },
          {
            label: "是否禁用",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.disabled}
                onChange={(v) => {
                  this.props.disabled = v;
                }}
              ></el-switch>
            ),
          },
        ]
      );
    return _;
  }
}
