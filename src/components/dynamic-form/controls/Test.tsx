import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderItemOp,
  type IConRightRenderOp,
} from "./BaseCon";
import {
  NFlex,
  NGrid,
  NGridItem,
  NInput,
  NInputNumber,
  NSwitch,
  NText,
} from "naive-ui";
import { BaseForm, type IRule } from "./BaseForm";

/**
 * 测试
 */
export class Test extends BaseForm {
  /** 控件类型 */
  static ConType = "Test";
  /** 控件名字 */
  static ConName = "测试";
  /** 单例对象 */
  static I = new Test();

  formDefaultValue = {
    number: 1,
    str: "字符串",
    b: false,
  };

  props = {
    minNumber: 10,
  };

  getRule(): IRule[] {
    return [
      ...super.getRule(),
      {
        type: "object",
        message: "",
        fields: {
          number: {
            type: "number",
            min: this.props.minNumber,
            message: "数字不能小于" + this.props.minNumber,
          },
        },
      },
    ];
  }

  renderRaw({ formData }: IConRenderOp) {
    let { value } = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NFlex vertical>
        <NText>测试控件</NText>
        <NGrid xGap={5} yGap={5}>
          <NGridItem span={4}>
            <NText>数字:</NText>
          </NGridItem>
          <NGridItem span={20}>
            <NInputNumber v-model:value={value.number} />
          </NGridItem>
        </NGrid>
        <NGrid>
          <NGridItem span={4}>
            <NText>字符串:</NText>
          </NGridItem>
          <NGridItem span={20}>
            <NInput v-model:value={value.str} />
          </NGridItem>
        </NGrid>
        <NGrid>
          <NGridItem span={4}>
            <NText>开关:</NText>
          </NGridItem>
          <NGridItem span={20}>
            <NSwitch v-model:value={value.b} />
          </NGridItem>
        </NGrid>
      </NFlex>
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    _.find((_) => _.key == "form")?.childs.push(
      ...[
        {
          label: "数字最小值",
          editor: <NInputNumber v-model:value={this.props.minNumber} />,
        },
      ]
    );
    return _;
  }

  getRightRule() {
    return [];
  }
}
