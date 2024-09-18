import { BaseCon, type IConRenderOp, type IConRightRenderOp } from "./BaseCon";

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

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <el-input-number
        model-value={ref.value}
        onInput={(v: any) => {
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

  getRight(op: IConRightRenderOp, hasEditor = true) {
    let _ = super.getRight(op, hasEditor);
    hasEditor &&
      _.find((_) => _.key == "com")?.childs!.unshift(
        ...[
          {
            label: "占位字符串",
            editor: (
              <el-input
                size="small"
                model-value={this.props.placeholder}
                onInput={(v: any) => {
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
                onChange={(v: any) => {
                  this.props.useMin = v;
                }}
              ></el-switch>
            ),
          },
          this.props.useMin
            ? {
                label: "最小值",
                editor: (
                  <el-input-number
                    size="small"
                    model-value={this.props.min}
                    onChange={(_: any) => {
                      this.props.min = _;
                    }}
                  />
                ),
              }
            : undefined,
          {
            label: "最大值限制",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.useMax}
                onChange={(v: any) => {
                  this.props.useMax = v;
                }}
              ></el-switch>
            ),
          },
          this.props.useMax
            ? {
                label: "最大值",
                editor: (
                  <el-input-number
                    size="small"
                    model-value={this.props.max}
                    onChange={(_: any) => {
                      this.props.max = _;
                    }}
                  />
                ),
              }
            : undefined,
          {
            label: "步数",
            editor: (
              <el-input-number
                size="small"
                model-value={this.props.step}
                onChange={(_: any) => {
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
                onChange={(v: any) => {
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
                onChange={(v: any) => {
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
