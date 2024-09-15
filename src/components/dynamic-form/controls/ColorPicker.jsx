import { BaseCon } from "./BaseCon";
import "../style/color-picker.scss";
import { predefineColors } from "../config/predefineColors";

/**
 * 颜色选择器
 */
export class ColorPicker extends BaseCon {
  /** 控件类型 */
  static ConType = "ColorPicker";
  /** 控件名字 */
  static ConName = "颜色选择器";
  /** 单例对象 */
  static I = new ColorPicker();

  props = {
    showAlpha: false,
    predefine: [],
  };

  formDefaultValue = "";

  renderRaw({ formData }) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <el-color-picker
        model-value={ref.value}
        onChange={(v) => {
          ref.value = v;
        }}
        show-alpha={this.props.showAlpha}
        predefine={this.props.predefine.filter(Boolean)}
      />
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.key == "com").childs.unshift(
        ...[
          {
            label: "选择透明度",
            editor: (
              <el-switch
                model-value={this.props.showAlpha}
                onChange={(v) => {
                  this.props.showAlpha = v;
                  this.formDefaultValue = "";
                  this.upadteRenderKey();
                }}
                size="small"
              ></el-switch>
            ),
          },
          {
            label: "预定义颜色",
            labelPosition: "top",
            editor: (
              <div class="controls__ color-picker">
                <div className="list">
                  {this.props.predefine.map((_, i) => {
                    return (
                      <div className="i">
                        <el-color-picker
                          size="small"
                          model-value={_}
                          onChange={(v) => {
                            this.props.predefine[i] = v;
                          }}
                          show-alpha
                          predefine={predefineColors}
                        />
                        <el-icon
                          class="remove"
                          onClick={() => {
                            this.props.predefine.splice(i, 1);
                          }}
                        >
                          <CircleClose />
                        </el-icon>
                      </div>
                    );
                  })}
                </div>
                <el-button
                  plain
                  size="small"
                  type="primary"
                  onClick={() => {
                    this.props.predefine.push("");
                  }}
                >
                  增加选项
                </el-button>
              </div>
            ),
          },
        ]
      );
    return _;
  }
}
