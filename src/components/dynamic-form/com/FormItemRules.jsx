import { ObjectUtils } from "../tool/obj/ObjectUtils";
import "../style/formItem-rules.scss";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";

/**
 * 表单验证规则
 */
export class FormItemRules {
  /** @type {import('element-plus').FormItemRule[]} */
  rules = [
    {
      key: 1,
      required: false,
      type: undefined,
      message: "",
    },
  ];

  /**
   * @param {FormItemRules} op
   */
  constructor(op) {
    for (let i in op) {
      this[i] = ObjectUtils.clone2(op[i]);
    }
  }

  reder() {
    return [
      {
        label: "校验规则设置：",
      },
      {
        editor: (
          <div class="formItem-rules">
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
                            model-value={_.required}
                            onChange={(v) => {
                              _.required = v;
                            }}
                          ></el-switch>
                        </div>
                        <div>
                          <span>错误提示</span>
                          <el-input
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
