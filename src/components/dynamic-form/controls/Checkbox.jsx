import { BaseCon } from "./BaseCon";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import "../style/checkbox.scss";

/**
 * 多选框
 */
export class Checkbox extends BaseCon {
  /** 控件类型 */
  static ConType = "Checkbox";
  /** 控件名字 */
  static ConName = "多选框";
  /** 单例对象 */
  static I = new Checkbox();

  list = [
    {
      key: BaseCon.getHash(),
      value: "1",
      name: "Option1",
      activate: true,
    },
    {
      key: BaseCon.getHash(),
      value: "2",
      name: "Option2",
      activate: true,
    },
  ];

  props = {
    border: false,
    size: "default",
    button: false,
    arrange: "row",
  };

  formDefaultValue = [];

  renderRaw({ formData }) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ checkbox">
        <el-checkbox-group
          model-value={ref.value}
          onChange={(v) => {
            ref.value = v;
          }}
          class={this.props.arrange}
        >
          {this.list.map((_) => {
            if (this.props.button) {
              return (
                <el-checkbox-button
                  key={_.key}
                  value={_.value}
                  size={this.props.size}
                  disabled={!_.activate}
                  border={this.props.border}
                >
                  {_.name}
                </el-checkbox-button>
              );
            }
            return (
              <el-checkbox
                key={_.key}
                value={_.value}
                size={this.props.size}
                disabled={!_.activate}
                border={this.props.border}
              >
                {_.name}
              </el-checkbox>
            );
          })}
        </el-checkbox-group>
      </div>
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "大小",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.size}
                onChange={(v) => {
                  this.props.size = v;
                }}
              >
                <el-radio-button label="large" value="large" />
                <el-radio-button label="default" value="default" />
                <el-radio-button label="small" value="small" />
              </el-radio-group>
            ),
          },
          {
            label: "排列方式",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.props.arrange}
                onChange={(v) => {
                  this.props.arrange = v;
                }}
              >
                <el-radio-button label="水平" value="row" />
                <el-radio-button label="竖直" value="col" />
              </el-radio-group>
            ),
          },
          {
            label: "显示边框",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.border}
                onChange={(v) => {
                  this.props.border = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "按钮样式",
            editor: (
              <el-switch
                size="small"
                model-value={this.props.button}
                onChange={(v) => {
                  this.props.button = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "选项设置：",
          },
          {
            editor: (
              <div class="controls__ checkbox-right">
                <Draggable
                  class="draggable"
                  modelValue={this.list}
                  onUpdate:modelValue={(_) => {
                    this.list = [..._];
                  }}
                  animation={draggableC.animation}
                  handle=".drag-handler"
                  item-key="key"
                >
                  {{
                    item: ({ element: _ }) => {
                      return (
                        <div class={"i " + (_.activate ? "activate" : "")}>
                          <div>
                            <span>激活</span>
                            <el-switch
                              size="small"
                              model-value={_.activate}
                              onChange={(v) => {
                                _.activate = v;
                              }}
                            ></el-switch>
                          </div>
                          <div>
                            <el-input
                              size="small"
                              model-value={_.value}
                              onInput={(v) => {
                                _.value = v;
                              }}
                            />
                            <el-input
                              size="small"
                              model-value={_.name}
                              onInput={(v) => {
                                _.name = v;
                              }}
                            />
                            <el-icon class="drag-handler">
                              <Rank />
                            </el-icon>
                            <el-icon
                              class="remove"
                              onClick={() => {
                                let i = this.list.findIndex(
                                  (__) => _.key == __.key
                                );
                                if (i >= 0) {
                                  this.list.splice(i, 1);
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
                    this.list.push({
                      key: BaseCon.getHash(),
                      value: (this.list.length + 1).toString(),
                      name: "Option" + (this.list.length + 1),
                      activate: true,
                    });
                  }}
                >
                  增加选项
                </el-button>
              </div>
            ),
          },
        ]
      );
    return _;
  }
}
