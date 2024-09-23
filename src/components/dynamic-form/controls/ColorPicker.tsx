import {
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { predefineColors } from "../config/predefineColors";
import { NColorPicker, NGridItem, NSwitch } from "naive-ui";
import { BaseOption, type IOpItem } from "./BaseOption";

/**
 * 颜色选择器
 */
export class ColorPicker extends BaseOption {
  /** 控件类型 */
  static ConType = "ColorPicker";
  /** 控件名字 */
  static ConName = "颜色选择器";
  /** 单例对象 */
  static I = new ColorPicker();

  props = {
    showAlpha: false,
    clearable: false,
  };

  formDefaultValue = "";

  constructor() {
    super();
    this.list = [];
  }

  getOp() {
    let op = super.getOp();
    op.value = "";
    return op;
  }

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    let swatches = this.list.map((_) => _.value).filter(Boolean);
    return (
      <NColorPicker
        v-model:value={ref.value}
        show-alpha={this.props.showAlpha}
        swatches={swatches.length <= 0 ? undefined : swatches}
        actions={this.props.clearable ? ["clear"] : undefined}
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "可清除",
        editor: <NSwitch v-model:value={this.props.clearable} />,
      },
      {
        label: "选择透明度",
        editor: (
          <NSwitch
            value={this.props.showAlpha}
            onUpdate:value={(v) => {
              this.props.showAlpha = v;
              this.formDefaultValue = "";
            }}
          />
        ),
      },
      ...this.getRightOptionEditor({
        showActivate: false,
        getLableEditor: () => undefined,
        getValueEditor: (_) => {
          return (
            <NGridItem span={18}>
              <NColorPicker
                v-model:value={_.value}
                swatches={predefineColors}
              />
            </NGridItem>
          );
        },
      }),
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
