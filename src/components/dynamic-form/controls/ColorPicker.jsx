import { BaseCon } from "./BaseCon";

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
        predefine={this.props.predefine}
      />
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
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
        ]
      );
    return _;
  }
}
