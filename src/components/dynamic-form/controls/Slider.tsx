import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightReterItemOp,
} from "./BaseCon";
import "../style/slider.scss";

/**
 * 滑块
 */
export class Slider extends BaseCon {
  /** 控件类型 */
  static ConType = "Slider";
  /** 控件名字 */
  static ConName = "滑块";
  /** 单例对象 */
  static I = new Slider();

  props: {
    min: number;
    max: number;
    step: number;
    showInput: boolean;
    range: boolean;
    marks: {
      value: number;
      style: string;
      label: string;
    }[];
  } = {
    min: 0,
    max: 100,
    step: 1,
    showInput: false,
    range: false,
    marks: [],
  };

  formDefaultValue: number | [number, number] = 0;

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ slider">
        <el-slider
          model-value={ref.value}
          onInput={(v: any) => {
            ref.value = v;
          }}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          show-input={this.props.showInput}
          range={this.props.range}
          marks={this.props.marks.reduce<any>((a, b) => {
            a[b.value] = {
              style: b.style,
              label: b.label,
            };
            return a;
          }, {})}
        />
      </div>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "最小值",
        editor: (
          <el-input-number
            size="small"
            max={this.props.max}
            model-value={this.props.min}
            onChange={(v: any) => {
              this.props.min = v;
            }}
          />
        ),
      },
      {
        label: "最大值",
        editor: (
          <el-input-number
            size="small"
            min={this.props.min}
            model-value={this.props.max}
            onChange={(v: any) => {
              this.props.max = v;
            }}
          />
        ),
      },
      {
        label: "步长",
        editor: (
          <el-input-number
            size="small"
            min={0}
            model-value={this.props.step}
            onChange={(v: any) => {
              this.props.step = v;
            }}
          />
        ),
      },
      {
        label: "显示输入框",
        editor: (
          <el-switch
            size="small"
            model-value={this.props.showInput}
            onChange={(v: any) => {
              this.props.showInput = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "范围选择",
        editor: (
          <el-switch
            size="small"
            model-value={this.props.range}
            onChange={(v: any) => {
              this.props.range = v;
              if (v) {
                this.formDefaultValue = [0, 0];
              } else {
                this.formDefaultValue = 0;
              }
            }}
          ></el-switch>
        ),
      },
      {
        label: "标记",
        editor: (
          <div class="controls__ slider-right">
            {this.props.marks.map((_, i) => {
              return (
                <div class="i">
                  <div class="item">
                    <span>值</span>
                    <el-input-number
                      size="small"
                      model-value={_.value}
                      onChange={(v: any) => {
                        _.value = v;
                      }}
                    />
                  </div>
                  <div class="item">
                    <span>标记</span>
                    <el-input
                      size="small"
                      clearable
                      model-value={_.label}
                      onInput={(v: any) => {
                        _.label = v;
                      }}
                    />
                  </div>
                  <div class="item">
                    <span>标记样式</span>
                    <el-input
                      size="small"
                      rows={2}
                      type="textarea"
                      model-value={_.style}
                      onInput={(v: any) => {
                        _.style = v;
                      }}
                    />
                  </div>
                  <el-icon
                    class="remove"
                    onClick={() => {
                      this.props.marks.splice(i, 1);
                    }}
                  >
                    <CircleClose />
                  </el-icon>
                </div>
              );
            })}
            <el-button
              plain
              size="small"
              type="primary"
              onClick={() => {
                this.props.marks.push({
                  value: 0,
                  label: "",
                  style: "",
                });
              }}
            >
              增加标记
            </el-button>
          </div>
        ),
      },
    ];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
