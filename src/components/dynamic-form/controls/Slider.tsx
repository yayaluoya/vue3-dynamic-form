import {
  NButton,
  NCard,
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NInputNumber,
  NSlider,
  NSwitch,
  NText,
} from "naive-ui";
import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightRenderItemOp,
} from "./BaseCon";
import { BaseForm } from "./BaseForm";
import { RemoveCircle } from "@vicons/ionicons5";

/**
 * 滑块
 */
export class Slider extends BaseForm {
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
    tooltip: boolean;
    range: boolean;
    marks: {
      value: number;
      label: string;
    }[];
    reverse: boolean;
  } = {
    min: 0,
    max: 100,
    step: 1,
    tooltip: true,
    range: false,
    marks: [],
    reverse: false,
  };

  formDefaultValue: number | [number, number] = 0;

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <NSlider
        v-model:value={ref.value}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        tooltip={this.props.tooltip}
        range={this.props.range}
        marks={this.props.marks.reduce<any>((a, b) => {
          a[b.value] = b.label;
          return a;
        }, {})}
        reverse={this.props.reverse}
      />
    );
  }

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightRenderItemOp["childs"] = [
      {
        label: "最小值",
        editor: (
          <NInputNumber v-model:value={this.props.min} max={this.props.max} />
        ),
      },
      {
        label: "最大值",
        editor: (
          <NInputNumber v-model:value={this.props.max} min={this.props.min} />
        ),
      },
      {
        label: "步长",
        editor: <NInputNumber v-model:value={this.props.step} />,
      },
      {
        label: "范围选择",
        editor: (
          <NSwitch
            value={this.props.range}
            onUpdate:value={(v: boolean) => {
              this.props.range = v;
              if (v) {
                this.formDefaultValue = [0, 0];
              } else {
                this.formDefaultValue = 0;
              }
            }}
          />
        ),
      },
      {
        label: "展示 tooltip",
        editor: <NSwitch v-model:value={this.props.tooltip} />,
      },
      {
        label: "倒转轨道",
        editor: <NSwitch v-model:value={this.props.reverse} />,
      },
      {
        label: "标记",
      },
      {
        editor: (
          <NFlex vertical style={"width: 100%"}>
            {this.props.marks.map((_, i) => {
              return (
                <NCard size="small">
                  <NGrid xGap={5} yGap={5}>
                    <NGridItem span={21}>
                      <NGrid xGap={5} yGap={5}>
                        <NGridItem span={5}>
                          <NText>值</NText>
                        </NGridItem>
                        <NGridItem span={19}>
                          <NInputNumber v-model:value={_.value} />
                        </NGridItem>
                        <NGridItem span={5}>
                          <NText>标记</NText>
                        </NGridItem>
                        <NGridItem span={19}>
                          <NInput v-model:value={_.label} />
                        </NGridItem>
                      </NGrid>
                    </NGridItem>
                    <NGridItem span={3}>
                      <NButton
                        size="small"
                        quaternary
                        circle
                        onClick={() => {
                          this.props.marks.splice(i, 1);
                        }}
                      >
                        <NIcon size={20}>
                          <RemoveCircle />
                        </NIcon>
                      </NButton>
                    </NGridItem>
                  </NGrid>
                </NCard>
              );
            })}
            <NButton
              size="small"
              type="primary"
              onClick={() => {
                this.props.marks.push({
                  value: 0,
                  label: "",
                });
              }}
            >
              增加标记
            </NButton>
          </NFlex>
        ),
      },
    ];
    _.find((_) => _.title == "常用属性")?.childs!.unshift(...add);
    return _;
  }
}
