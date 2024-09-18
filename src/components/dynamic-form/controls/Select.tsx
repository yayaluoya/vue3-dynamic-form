import { BaseCon, type IConRenderOp, type IConRightRenderOp } from "./BaseCon";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import "../style/select.scss";

/**
 * 选择器
 */
export class Select extends BaseCon {
  /** 控件类型 */
  static ConType = "Select";
  /** 控件名字 */
  static ConName = "选择器";
  /** 单例对象 */
  static I = new Select();

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
    clearable: false,
    placeholder: "",
  };

  formDefaultValue = "";

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ select">
        <el-select
          model-value={ref.value}
          onChange={(v: any) => {
            ref.value = v;
          }}
          clearable={this.props.clearable}
          placeholder={this.props.placeholder}
        >
          {this.list.map((_) => {
            return (
              <el-option
                key={_.key}
                value={_.value}
                label={_.name}
                disabled={!_.activate}
              ></el-option>
            );
          })}
        </el-select>
      </div>
    );
  }

  getRight(op: IConRightRenderOp, hasEditor = true) {
    let _ = super.getRight(op, hasEditor);
    hasEditor &&
      _.find((_) => _.key == "com")?.childs!.unshift(
        ...[
          {
            label: "占位字符串",
            editor: (
              <el-input
                size="small"
                model-value={this.props.placeholder}
                onInput={(v: any) => {
                  this.props.placeholder = v;
                }}
              />
            ),
          },
          {
            label: "可清除",
            editor: (
              <el-switch
                model-value={this.props.clearable}
                onChange={(v: any) => {
                  this.props.clearable = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "选项设置",
            labelPosition: "top",
            editor: (
              <div class="controls__ select-right">
                <Draggable
                  class="draggable"
                  modelValue={this.list}
                  onUpdate:modelValue={(_: any[]) => {
                    this.list = [..._];
                  }}
                  animation={draggableC.animation}
                  handle=".drag-handler"
                  item-key="key"
                >
                  {{
                    item: ({
                      element: _,
                    }: {
                      element: getArrayItemType<Select["list"]>;
                    }) => {
                      return (
                        <div class={"i " + (_.activate ? "activate" : "")}>
                          <div>
                            <span>激活</span>
                            <el-switch
                              size="small"
                              model-value={_.activate}
                              onChange={(v: any) => {
                                _.activate = v;
                              }}
                            ></el-switch>
                          </div>
                          <div>
                            <el-input
                              size="small"
                              model-value={_.value}
                              onInput={(v: any) => {
                                _.value = v;
                              }}
                            />
                            <el-input
                              size="small"
                              model-value={_.name}
                              onInput={(v: any) => {
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
