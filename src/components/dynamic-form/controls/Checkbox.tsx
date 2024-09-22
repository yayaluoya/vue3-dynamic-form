import {
  BaseCon,
  type IConRenderOp,
  type IConRightRenderOp,
  type IConRightReterItemOp,
} from "./BaseCon";
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
    button: false,
    arrange: "row",
  };

  formDefaultValue: string[] = [];

  renderRaw({ formData }: IConRenderOp) {
    let ref = this.getFormValueRef(formData, this.formDefaultValue);
    return (
      <div class="controls__ checkbox">
        <el-checkbox-group
          model-value={ref.value}
          onChange={(v: any) => {
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

  getRight(op: IConRightRenderOp) {
    let _ = super.getRight(op);
    let add: IConRightReterItemOp["childs"] = [
      {
        label: "排列方式",
        editor: (
          <el-radio-group
            size="small"
            model-value={this.props.arrange}
            onChange={(v: any) => {
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
            onChange={(v: any) => {
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
            onChange={(v: any) => {
              this.props.button = v;
            }}
          ></el-switch>
        ),
      },
      {
        label: "选项设置",
        editor: (
          <div class="controls__ checkbox-right">
            <Draggable
              class="draggable"
              modelValue={this.list}
              onUpdate:modelValue={(_: Checkbox["list"]) => {
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
                  element: getArrayItemType<Checkbox["list"]>;
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
    ];
    _.find((_) => _.key == "com")?.childs!.unshift(...add);
    return _;
  }
}
