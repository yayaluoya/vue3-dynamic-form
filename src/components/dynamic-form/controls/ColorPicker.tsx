import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightReterItemOp,
} from "./BaseCon";
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

  props: {
    showAlpha: boolean;
    predefine: string[];
  } = {
    showAlpha: false,
    predefine: [],
  };

  formDefaultValue = "";

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <el-color-picker
        model-value={ref.value}
        onChange={(v: any) => {
          ref.value = v;
        }}
        show-alpha={this.props.showAlpha}
        predefine={this.props.predefine.filter(Boolean)}
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "选择透明度",
        editor: (
          <el-switch
            model-value={this.props.showAlpha}
            onChange={(v: any) => {
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
        labelPlacement: "top",
        editor: (
          <div class="controls__ color-picker">
            <div class="list">
              {this.props.predefine.map((_, i) => {
                return (
                  <div class="i">
                    <el-color-picker
                      size="small"
                      model-value={_}
                      onChange={(v: any) => {
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
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
