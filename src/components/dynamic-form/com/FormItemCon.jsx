import { ObjectUtils } from "../tool/obj/ObjectUtils";
import "../style/form-item.scss";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import { FontStyleCon } from "./FontStyleCon";
import { ArrayUtils } from "../tool/ArrayUtils";

/**
 * 表单项控制器
 */
export class FormItemCon {
  /** 最终绑定到formData上的属性名，如果设置为undefined的话表示这个控件不绑定值到formData上 */
  prop = undefined;
  label = "控件";
  /** 隐藏label */
  hideLabel = false;
  /** 标签字体样式 */
  LabelFontStyle = new FontStyleCon({
    fontSize: 14,
  });
  /** 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性 默认会继承 Form的label-position */
  labelPosition = [];
  /** 标签对齐方式 */
  labelAlign = [];
  /** 标签宽度，例如 '50px'。 可以使用 auto。 */
  labelWidth = 0;
  /** 是否显示校验错误信息 */
  showMessage = true;
  /** 用于控制该表单域下组件的默认尺寸 */
  size = "";
  /** @type {any[]} 校验规则列表 */
  rules = [];

  /**
   * @param {FormItemCon} op
   */
  constructor(op) {
    for (let i in op) {
      this[i] = ObjectUtils.clone2(op[i]);
    }
    this.LabelFontStyle = new FontStyleCon(this.LabelFontStyle);
  }

  reder() {
    return [
      {
        label: "表单字段名",
        labelPosition: "top",
        editor: (
          <el-input
            size="small"
            model-value={this.prop}
            onInput={(v) => {
              this.prop = v;
            }}
          />
        ),
      },
      {
        label: "组件大小",
        editor: (
          <el-select
            model-value={this.size}
            size="small"
            onChange={(v) => {
              this.size = v;
            }}
            placeholder="请选择"
            clearable
          >
            <el-option label="large" value="large" />
            <el-option label="default" value="default" />
            <el-option label="small" value="small" />
          </el-select>
        ),
      },
      {
        label: "隐藏标签",
        editor: (
          <el-switch
            size="small"
            model-value={this.hideLabel}
            onChange={(v) => {
              this.hideLabel = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "标签名",
        editor: (
          <el-input
            size="small"
            model-value={this.label}
            onInput={(v) => {
              this.label = v;
            }}
          />
        ),
      },
      {
        label: "标签位置",
        editor: (
          <el-checkbox-group
            size="small"
            model-value={this.labelPosition}
            onChange={(v) => {
              this.labelPosition = ArrayUtils.eliminate(v, (_) =>
                this.labelPosition.includes(_)
              );
            }}
          >
            <el-checkbox-button label="left" value="left" />
            <el-checkbox-button label="top" value="top" />
          </el-checkbox-group>
        ),
      },
      {
        label: "字段标签对齐",
        labelPosition: "top",
        editor: (
          <el-checkbox-group
            size="small"
            model-value={this.labelAlign}
            onChange={(v) => {
              this.labelAlign = ArrayUtils.eliminate(v, (_) =>
                this.labelAlign.includes(_)
              );
            }}
          >
            <el-checkbox-button label="left" value="left" />
            <el-checkbox-button label="center" value="center" />
            <el-checkbox-button label="right" value="right" />
          </el-checkbox-group>
        ),
      },
      {
        label: "标签宽度",
        editor: (
          <el-input-number
            size="small"
            min={0}
            model-value={this.labelWidth}
            onChange={(v) => {
              this.labelWidth = v;
            }}
          />
        ),
      },
      ...this.LabelFontStyle.render(),
      {
        label: "显示校验错误信息",
        editor: (
          <el-switch
            size="small"
            model-value={this.showMessage}
            onChange={(v) => {
              this.showMessage = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "校验规则",
        labelPosition: "top",
        editor: (
          <div class="form-item-rules">
            <Draggable
              class="draggable"
              modelValue={this.rules}
              onUpdate:modelValue={(_) => {
                this.rules = [..._];
              }}
              animation={draggableC.animation}
              handle=".drag-handler"
              item-key="key"
            >
              {{
                item: ({ element: _ }) => {
                  return (
                    <div class="i">
                      <div>
                        <div>
                          <span>类型</span>
                          <el-select
                            model-value={_.type}
                            onChange={(v) => {
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
                            onChange={(v) => {
                              _.required = v;
                            }}
                          ></el-switch>
                        </div>
                        <div>
                          <span>错误提示</span>
                          <el-input
                            size="small"
                            model-value={_.message}
                            onInput={(v) => {
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
                            let i = this.rules.findIndex(
                              (__) => _.key == __.key
                            );
                            if (i >= 0) {
                              this.rules.splice(i, 1);
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
                this.rules.push({
                  key: Math.max(...this.rules.map((_) => _.key), 1) + 1,
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
