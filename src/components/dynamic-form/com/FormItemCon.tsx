import { ObjectUtils } from "../tool/obj/ObjectUtils";
import "../style/form-item.scss";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import {
  NCheckbox,
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
        labelPlacement: "top",
        editor: <NInput v-model:value={this.path} size="small" />,
      },
      {
        label: "标签名",
        editor: <NInput v-model:value={this.label} size="small" />,
      },
      {
        label: (
          <NSpace>
            <span>标签宽度</span>
            <NCheckbox
              checked={this.selfProps.includes("labelWidth")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("labelWidth")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "labelWidth"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        editor: <NInput v-model:value={this.labelWidth} size="small" />,
      },
      {
        label: (
          <NSpace>
            <span>标签文本对齐方式</span>
            <NCheckbox
              checked={this.selfProps.includes("labelAlign")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("labelAlign")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "labelAlign"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        labelPlacement: "top",
        editor: (
          <NRadioGroup v-model:value={this.labelAlign} size="small">
            <NRadioButton label="left" value="left" />
            <NRadioButton label="center" value="center" />
            <NRadioButton label="right" value="right" />
          </NRadioGroup>
        ),
      },
      {
        label: (
          <NSpace>
            <span>标签位置</span>
            <NCheckbox
              checked={this.selfProps.includes("labelPlacement")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("labelPlacement")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "labelPlacement"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        editor: (
          <NRadioGroup v-model:value={this.labelPlacement} size="small">
            <NRadioButton label="left" value="left" />
            <NRadioButton label="top" value="top" />
          </NRadioGroup>
        ),
      },
      {
        label: "标签样式",
        labelPlacement: "top",
        editor: (
          <NInput
            v-model:value={this.labelStyle}
            size="small"
            type="textarea"
          />
        ),
      },

      {
        label: (
          <NSpace>
            <span>展示标签</span>
            <NCheckbox
              checked={this.selfProps.includes("showLabel")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("showLabel")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "showLabel"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        editor: <NSwitch v-model:value={this.showLabel} size="small" />,
      },
      {
        label: (
          <NSpace>
            <span>展示必填星号</span>
            <NCheckbox
              checked={this.selfProps.includes("showRequireMark")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("showRequireMark")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "showRequireMark"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        editor: <NSwitch v-model:value={this.showRequireMark} size="small" />,
      },
      {
        label: (
          <NSpace>
            <span>必填星号位置</span>
            <NCheckbox
              checked={this.selfProps.includes("requireMarkPlacement")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("requireMarkPlacement")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "requireMarkPlacement"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        labelPlacement: "top",
        editor: (
          <NRadioGroup v-model:value={this.requireMarkPlacement} size="small">
            <NRadioButton label="left" value="left" />
            <NRadioButton label="right" value="right" />
            <NRadioButton label="right-hanging" value="right-hanging" />
          </NRadioGroup>
        ),
      },
      {
        label: (
          <NSpace>
            <span>展示校验反馈</span>
            <NCheckbox
              checked={this.selfProps.includes("showFeedback")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("showFeedback")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "showFeedback"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        editor: <NSwitch v-model:value={this.showFeedback} size="small" />,
      },
      {
        label: (
          <NSpace>
            <span>尺寸</span>
            <NCheckbox
              checked={this.selfProps.includes("size")}
              on-update:checked={(v: boolean) => {
                v
                  ? this.selfProps.push("size")
                  : (this.selfProps = this.selfProps.filter(
                      (_) => _ != "size"
                    ));
              }}
              size="small"
            ></NCheckbox>
          </NSpace>
        ),
        editor: (
          <NSelect
            v-model:value={this.size}
            size="small"
            placeholder="请选择"
            clearable
            options={[
              { label: "large", value: "large" },
              { label: "medium", value: "medium" },
              { label: "small", value: "small" },
            ]}
          />
        ),
      },
      {
        label: "校验规则",
        labelPlacement: "top",
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
                    <div class="i">
                      <div>
                        <div>
                          <span>类型</span>
                          <el-select
                            model-value={_.type}
                            onChange={(v: any) => {
                              _.type = v;
                            }}
                            size="small"
                            placeholder="选择类型"
                            filterable
                          >
                            <el-option label="string" value="string" />
                            <el-option label="number" value="number" />
                            <el-option label="boolean" value="boolean" />
                            <el-option label="method" value="method" />
                            <el-option label="regexp" value="regexp" />
                            <el-option label="integer" value="integer" />
                            <el-option label="float" value="float" />
                            <el-option label="array" value="array" />
                            <el-option label="object" value="object" />
                            <el-option label="enum" value="enum" />
                            <el-option label="date" value="date" />
                            <el-option label="url" value="url" />
                            <el-option label="hex" value="hex" />
                            <el-option label="email" value="email" />
                            <el-option label="pattern" value="pattern" />
                            <el-option label="any" value="any" />
                          </el-select>
                        </div>
                        <div>
                          <span>必填</span>
                          <el-switch
                            size="small"
                            model-value={_.required}
                            onChange={(v: any) => {
                              _.required = v;
                            }}
                          ></el-switch>
                        </div>
                        <div>
                          <span>错误提示</span>
                          <el-input
                            size="small"
                            model-value={_.message}
                            onInput={(v: any) => {
                              _.message = v;
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <el-icon class="drag-handler">
                          <Rank />
                        </el-icon>
                        <el-icon
                          class="remove"
                          onClick={() => {
                            let i = this.rule.findIndex(
                              (__) => _.key == __.key
                            );
                            if (i >= 0) {
                              this.rule.splice(i, 1);
                            }
                          }}
                        >
                          <CircleClose />
                        </el-icon>
                      </div>
                    </div>
                  );
                },
              }}
            </Draggable>
            <el-button
              plain
              size="small"
              type="primary"
              onClick={() => {
                this.rule.push({
                  key_: Math.max(...this.rule.map((_) => _.key_), 1) + 1,
                  required: false,
                  message: "",
                });
              }}
            >
              增加校验规则
            </el-button>
          </div>
        ),
      },
    ];
  }
}
