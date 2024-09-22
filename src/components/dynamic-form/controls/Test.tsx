import { BaseCon, type IConRenderOp } from "./BaseCon";
import { FormItemCon } from "../com/FormItemCon";
import {
  NFlex,
  NGrid,
  NGridItem,
  NInput,
  NInputNumber,
  NSwitch,
} from "naive-ui";

class FormItemCon_ extends FormItemCon {
  render() {
    return [];
  }
}

/**
 * 测试
 */
export class Test extends BaseCon {
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

  init(config: Partial<Test>) {
    this.formItem = new FormItemCon_(config?.formItem || this.formItem);
  }

  renderRaw({ formData }: IConRenderOp) {
    let { value } = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NFlex vertical>
        测试控件
        <NGrid xGap={5} yGap={5}>
          <NGridItem span={4}>数字:</NGridItem>
          <NGridItem span={20}>
            <NInputNumber v-model:value={value.number} />
          </NGridItem>
        </NGrid>
        <NGrid>
          <NGridItem span={4}>字符串:</NGridItem>
          <NGridItem span={20}>
            <NInput v-model:value={value.str} />
          </NGridItem>
        </NGrid>
        <NGrid>
          <NGridItem span={4}>开关:</NGridItem>
          <NGridItem span={20}>
            <NSwitch v-model:value={value.b} />
          </NGridItem>
        </NGrid>
      </NFlex>
    );
  }
}
