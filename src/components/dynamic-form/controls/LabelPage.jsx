import DraggableCon from "../com/draggable.vue";
import "../style/label-page.scss";
import Item from "../com/item.vue";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import { BaseCon } from "./BaseCon";
import { NonForm } from "./NonForm";

/**
 * 标签页
 */
export class LabelPage extends NonForm {
  /** 控件类型 */
  static ConType = "LabelPage";
  /** 控件名字 */
  static ConName = "标签页";
  /** 单例对象 */
  static I = new LabelPage();

  tabs = [
    {
      key: BaseCon.getHash(),
      label: "tab1",
      activate: true,
      childs: [],
    },
  ];
  activeName = 0;
  tabsProps = {
    /** @type {'' | 'card' | 'border-card'} 风格类型 */
    type: "border-card",
    /** @type {'top' | 'right' | 'bottom' | 'left'} 选项卡所在位置 */
    tabPosition: "top",
  };

  getChild() {
    return this.tabs.reduce((a, b) => {
      return [...a, ...b.childs];
    }, []);
  }

  initConfig(configs, toCons) {
    super.initConfig(configs, toCons);
    this.tabs.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }) {
    return (
      <div
        class={[
          "controls__ label-page",
          activateCon?.key == this.key || this.tabsProps.type == "border-card"
            ? ""
            : "border",
        ].join(" ")}
      >
        <el-tabs
          model-value={this.activeName}
          onTabChange={(_) => {
            this.activeName = _;
          }}
          type={this.tabsProps.type}
          tab-position={this.tabsProps.tabPosition}
          style="margin: 1px;"
        >
          {this.tabs.map((_, i) => {
            return (
              <el-tab-pane
                key={_.key}
                label={_.label}
                name={i}
                disabled={!_.activate}
              >
                {formData ? (
                  _.activate ? (
                    _.childs.map((con) => {
                      return (
                        <Item
                          key={con.key}
                          parent={this}
                          formConfig={formConfig}
                          formData={formData}
                          cons={cons}
                          con={con}
                          preview
                        />
                      );
                    })
                  ) : null
                ) : (
                  <DraggableCon
                    parent={this}
                    cons={_.childs}
                    formConfig={formConfig}
                    activateCon={activateCon}
                    onUpdate:cons={(__) => {
                      _.childs = __;
                    }}
                    onUpdate:activateCon={(_) => {
                      ctx.emit("activateConF", _);
                    }}
                    style={
                      _.childs.length <= 0
                        ? "min-height: 80px;"
                        : "min-height: 20px;"
                    }
                  />
                )}
              </el-tab-pane>
            );
          })}
        </el-tabs>
      </div>
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "风格类型",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.tabsProps.type}
                onChange={(v) => {
                  this.tabsProps.type = v;
                }}
              >
                <el-radio-button label="default" value="" />
                <el-radio-button label="card" value="card" />
                <el-radio-button label="border-card" value="border-card" />
              </el-radio-group>
            ),
          },
          {
            label: "选项卡位置",
            editor: (
              <el-radio-group
                size="small"
                model-value={this.tabsProps.tabPosition}
                onChange={(v) => {
                  this.tabsProps.tabPosition = v;
                }}
              >
                <el-radio-button label="top" value="top" />
                <el-radio-button label="right" value="right" />
                <el-radio-button label="bottom" value="bottom" />
                <el-radio-button label="left" value="left" />
              </el-radio-group>
            ),
          },
          {
            label: "选项卡设置：",
          },
          {
            editor: (
              <div class="controls__ label-page-right">
                <Draggable
                  class="draggable"
                  modelValue={this.tabs}
                  onUpdate:modelValue={(_) => {
                    this.tabs = [..._];
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
                              model-value={_.label}
                              onInput={(v) => {
                                _.label = v;
                              }}
                            />
                            <el-icon class="drag-handler">
                              <Rank />
                            </el-icon>
                            <el-icon
                              class="remove"
                              onClick={() => {
                                let i = this.tabs.findIndex(
                                  (__) => _.key == __.key
                                );
                                if (i >= 0) {
                                  this.tabs.splice(i, 1);
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
                    this.tabs.push({
                      key: BaseCon.getHash(),
                      label: "tab" + (this.tabs.length + 1),
                      activate: true,
                      childs: [],
                    });
                  }}
                >
                  增加选项卡
                </el-button>
              </div>
            ),
          },
        ]
      );
    return _;
  }
}
