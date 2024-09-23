import {
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { NCheckbox, NCheckboxGroup } from "naive-ui";
import { BaseOption } from "./BaseOption";

/**
 * 多选框
 */
export class Checkbox extends BaseOption {
  /** 控件类型 */
  static ConType = "Checkbox";
  /** 控件名字 */
  static ConName = "多选框";
  /** 单例对象 */
  static I = new Checkbox();

  formDefaultValue: string[] = [];

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NCheckboxGroup v-model:value={ref.value}>
        {this.list.map((_) => {
          return (
            <NCheckbox
              key={_.key}
              label={_.label}
              value={_.value}
              disabled={!_.activate}
            ></NCheckbox>
          );
        })}
      </NCheckboxGroup>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [...this.getRightOptionEditor()];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
