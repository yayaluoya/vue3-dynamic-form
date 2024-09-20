import { ObjectUtils } from "../tool/obj/ObjectUtils";
import "../style/form-item.scss";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import {
  NButton,
  NCard,
  NCheckbox,
  NFlex,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSpace,
  NSwitch,
  type FormItemProps,
  type FormItemRule,
} from "naive-ui";
import type { IConRightReterItemOp } from "../controls/BaseCon";
import { Move, RemoveCircle } from "@vicons/ionicons5";

/**
 * 表单项控制器
 */
export class FormItemCon {
  label = "控件";
  /** 将值收集到外层表单 model 对象的路径 */
  path: string | undefined = undefined;
  private labelAlign: FormItemProps["labelAlign"] = "right";
  private labelPlacement: FormItemProps["labelPlacement"] = "left";
  private labelStyle: FormItemProps["labelStyle"] = "";
  private labelWidth: FormItemProps["labelWidth"] = "auto";
  private showFeedback: FormItemProps["showFeedback"] = true;
  private showLabel: FormItemProps["showLabel"] = true;
  private showRequireMark: FormItemProps["showRequireMark"] = true;
  private requireMarkPlacement: FormItemProps["requireMarkPlacement"] = "right";
  private size: FormItemProps["size"] = "medium";
  /** 校验规则列表 */
  private rule: (FormItemRule & { key_: number })[] = [];

  private selfProps: (keyof Pick<
    FormItemProps,
    | "labelAlign"
    | "labelPlacement"
    | "labelWidth"
    | "showFeedback"
    | "showLabel"
    | "showRequireMark"
    | "requireMarkPlacement"
    | "size"
  >)[] = [];

  constructor(op?: FormItemCon) {
    for (let i in op) {
      (this as any)[i] = ObjectUtils.clone2((op as any)[i]);
    }
  }

  getFormItemProps(): FormItemProps {
    return {
      label: this.label,
      path: this.path,
      labelAlign: this.selfProps.includes("labelAlign")
        ? this.labelAlign
        : undefined,
      labelPlacement: this.selfProps.includes("labelPlacement")
        ? this.labelPlacement
        : undefined,
      labelStyle: this.labelStyle,
      labelWidth: this.selfProps.includes("labelWidth")
        ? this.labelWidth
        : undefined,
      showFeedback: this.selfProps.includes("showFeedback")
        ? this.showFeedback
        : undefined,
      showLabel: this.selfProps.includes("showLabel")
        ? this.showLabel
        : undefined,
      showRequireMark: this.selfProps.includes("showRequireMark")
        ? this.showRequireMark
        : undefined,
      requireMarkPlacement: this.selfProps.includes("requireMarkPlacement")
        ? this.requireMarkPlacement
        : undefined,
      size: this.selfProps.includes("size") ? this.size : undefined,
      rule: this.rule,
    };
  }

  render(): IConRightReterItemOp["childs"] {
    return [
      {
        label: "表单字段路径",
      },
      {
        editor: <NInput v-model:value={this.path} />,
      },
      {
        label: "标签名",
        editor: <NInput v-model:value={this.label} />,
      },
      {
        label: "标签宽度",
        editor: (
          <NFlex wrap={false} align="center">
            <NCheckbox
              checked={this.selfProps.includes("labelWidth")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("labelWidth")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "labelWidth"
                    ));
              }}
            ></NCheckbox>
            <NInput v-model:value={this.labelWidth} />
          </NFlex>
        ),
      },
      {
        label: "标签对齐方式",
        editor: (
          <NFlex wrap={false} align="center" style={"width: 100%"}>
            <NCheckbox
              checked={this.selfProps.includes("labelAlign")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("labelAlign")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "labelAlign"
                    ));
              }}
            ></NCheckbox>
            <NSelect
              v-model:value={this.labelAlign}
              placeholder="请选择"
              options={[
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
              ]}
            />
          </NFlex>
        ),
      },
      {
        label: "标签位置",
        editor: (
          <NFlex wrap={false} align="center" style={"width: 100%"}>
            <NCheckbox
              checked={this.selfProps.includes("labelPlacement")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("labelPlacement")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "labelPlacement"
                    ));
              }}
            ></NCheckbox>
            <NSelect
              v-model:value={this.labelPlacement}
              placeholder="请选择"
              options={[
                { label: "left", value: "left" },
                { label: "top", value: "top" },
              ]}
            />
          </NFlex>
        ),
      },
      {
        label: "标签样式",
      },
      {
        editor: <NInput v-model:value={this.labelStyle} type="textarea" />,
      },
      {
        label: "展示标签",
        editor: (
          <NFlex wrap={false} align="center">
            <NCheckbox
              checked={this.selfProps.includes("showLabel")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("showLabel")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "showLabel"
                    ));
              }}
            ></NCheckbox>
            <NSwitch v-model:value={this.showLabel} />
          </NFlex>
        ),
      },
      {
        label: "展示必填星号",
        editor: (
          <NFlex wrap={false} align="center" style={"width: 100%"}>
            <NCheckbox
              checked={this.selfProps.includes("showRequireMark")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("showRequireMark")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "showRequireMark"
                    ));
              }}
            ></NCheckbox>
            <NSwitch v-model:value={this.showRequireMark} />
          </NFlex>
        ),
      },
      {
        label: "必填星号位置",
        editor: (
          <NFlex wrap={false} align="center" style={"width: 100%"}>
            <NCheckbox
              checked={this.selfProps.includes("requireMarkPlacement")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("requireMarkPlacement")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "requireMarkPlacement"
                    ));
              }}
            ></NCheckbox>
            <NSelect
              v-model:value={this.requireMarkPlacement}
              placeholder="请选择"
              options={[
                { label: "left", value: "left" },
                { label: "right", value: "right" },
                { label: "right-hanging", value: "right-hanging" },
              ]}
            />
          </NFlex>
        ),
      },
      {
        label: "展示校验反馈",
        editor: (
          <NFlex wrap={false} align="center">
            <NCheckbox
              checked={this.selfProps.includes("showFeedback")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("showFeedback")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "showFeedback"
                    ));
              }}
            ></NCheckbox>
            <NSwitch v-model:value={this.showFeedback} />
          </NFlex>
        ),
      },
      {
        label: "尺寸",
        editor: (
          <NFlex wrap={false} align="center">
            <NCheckbox
              checked={this.selfProps.includes("size")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("size")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "size"
                    ));
              }}
            ></NCheckbox>
            <NSelect
              v-model:value={this.size}
              placeholder="请选择"
              clearable
              options={[
                { label: "large", value: "large" },
                { label: "medium", value: "medium" },
                { label: "small", value: "small" },
              ]}
            />
          </NFlex>
        ),
      },
      {
        label: "校验规则",
      },
      {
        editor: (
          <div class="form-item-rules">
            <Draggable
              class="draggable"
              modelValue={this.rule}
              onUpdate:modelValue={(_: any[]) => {
                this.rule = [..._];
              }}
              animation={draggableC.animation}
              handle=".drag-handler"
              item-key="key"
            >
              {{
                item: ({
                  element: _,
                }: {
                  element: getArrayItemType<FormItemCon["rule"]>;
                }) => {
                  return (
                    <NCard style="margin-bottom: 10px;width: 100%" size="small">
                      <NFlex wrap={false} justify="space-between">
                        <NGrid yGap={5} xGap={5}>
                          <NGridItem span={10}>类型</NGridItem>
                          <NGridItem span={14}>
                            <NSelect
                              v-model:value={_.type}
                              placeholder="请选择"
                              options={[
                                { label: "string", value: "string" },
                                { label: "number", value: "number" },
                                { label: "boolean", value: "boolean" },
                                { label: "method", value: "method" },
                                { label: "regexp", value: "regexp" },
                                { label: "integer", value: "integer" },
                                { label: "float", value: "float" },
                                { label: "array", value: "array" },
                                { label: "object", value: "object" },
                                { label: "enum", value: "enum" },
                                { label: "date", value: "date" },
                                { label: "url", value: "url" },
                                { label: "hex", value: "hex" },
                                { label: "email", value: "email" },
                                { label: "pattern", value: "pattern" },
                                { label: "any", value: "any" },
                              ]}
                            />
                          </NGridItem>
                          <NGridItem span={10}>必填</NGridItem>
                          <NGridItem span={14}>
                            <NSwitch v-model:value={_.required} />
                          </NGridItem>
                          <NGridItem span={10}>错误提示</NGridItem>
                          <NGridItem span={14}>
                            <NInput v-model:value={_.message} />
                          </NGridItem>
                        </NGrid>
                        <NFlex vertical>
                          <NButton
                            size="small"
                            class="drag-handler"
                            quaternary
                            circle
                          >
                            <NIcon size={20}>
                              <Move />
                            </NIcon>
                          </NButton>
                          <NButton
                            size="small"
                            class="remove"
                            quaternary
                            circle
                            onClick={() => {
                              let i = this.rule.findIndex(
                                (__) => _.key == __.key
                              );
                              if (i >= 0) {
                                this.rule.splice(i, 1);
                              }
                            }}
                          >
                            <NIcon size={20}>
                              <RemoveCircle />
                            </NIcon>
                          </NButton>
                        </NFlex>
                      </NFlex>
                    </NCard>
                  );
                },
              }}
            </Draggable>
            <NButton
              type="primary"
              style={"width: 100%"}
              onClick={() => {
                this.rule.push({
                  key_: Math.max(...this.rule.map((_) => _.key_), 1) + 1,
                  required: false,
                  message: "",
                });
              }}
            >
              增加校验规则
            </NButton>
          </div>
        ),
      },
    ];
  }
}
