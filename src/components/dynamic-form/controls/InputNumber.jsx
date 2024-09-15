import { BaseCon } from "./BaseCon";

/**
 * 数字输入框
 */
export class InputNumber extends BaseCon {
  /** 控件类型 */
  static ConType = "InputNumber";
  /** 控件名字 */
  static ConName = "计数器";
  /** 单例对象 */
  static I = new InputNumber();

  props = {
    placeholder: "",
    useMin: false,
    min: 0,
    useMax: false,
    max: 0,
    step: 1,
    controls: true,
    controlsPosition: "",
  };

  formDefaultValue = 0;

  renderRaw({ formData }) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <el-input-number
        model-value={ref.value}
        onInput={(v) => {
          ref.value = v;
        }}
        placeholder={this.props.placeholder}
        min={this.props.useMin ? this.props.min : undefined}
        max={this.props.useMax ? this.props.max : undefined}
        step={this.props.step}
        controls={this.props.controls}
        controls-position={this.props.controlsPosition}
      />
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "占位字符串",
            editor: (
              <el-input
                size="small"
                model-value={this.props.placeholder}
                onInput={(v) => {
                  this.props.placeholder = v;
                }}
              />
            ),
          },
          {
            label: "最小值限制",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.useMin}
                onChange={(v) => {
                  this.props.useMin = v;
                }}
              ></el-switch>
            ),
          },
          this.props.useMin && {
            label: "最小值",
            editor: (
              <el-input-number
                size="small"
                model-value={this.props.min}
                onChange={(_) => {
                  this.props.min = _;
                }}
              />
            ),
          },
          {
            label: "最大值限制",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.useMax}
                onChange={(v) => {
                  this.props.useMax = v;
                }}
              ></el-switch>
            ),
          },
          this.props.useMax && {
            label: "最大值",
            editor: (
              <el-input-number
                size="small"
                model-value={this.props.max}
                onChange={(_) => {
                  this.props.max = _;
                }}
              />
            ),
          },
          {
            label: "步数",
            editor: (
              <el-input-number
                size="small"
                model-value={this.props.step}
                onChange={(_) => {
                  this.props.step = _;
                }}
              />
            ),
          },
          {
            label: "使用控制按钮",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.controls}
                onChange={(v) => {
                  this.props.controls = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "控制按钮位置",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.controlsPosition}
                onChange={(v) => {
                  this.props.controlsPosition = v;
                }}
              >
                <el-radio-button label="default" value="" />
                <el-radio-button label="right" value="right" />
              </el-radio-group>
            ),
          },
        ]
      );
    return _;
  }
}
