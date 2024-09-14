import DraggableCon from "../com/draggable.vue";
import { Layout } from "./Layout";
import Item from "../com/item.vue";
import Draggable from "vuedraggable";
import draggableC from "../config/draggableC";
import { BaseCon } from "./BaseCon";
import "../style/collapse.scss";

/**
 * 折叠面板
 */
export class Collapse extends Layout {
  /** 控件类型 */
  static ConType = "Collapse";
  /** 控件名字 */
  static ConName = "折叠面板";
  /** 单例对象 */
  static I = new Collapse();

  collapses = [
    {
      key: BaseCon.getHash(),
      title: "Collapse1",
      childs: [],
    },
  ];
  activeNames = [0];
  collapseProps = {
    /** 是否手风琴模式 */
    accordion: false,
  };

  getChild() {
    return this.collapses.reduce((a, b) => {
      return [...a, ...b.childs];
    }, []);
  }

  initConfig(configs, toCons) {
    super.initConfig(configs, toCons);
    this.collapses.forEach((_) => {
      _.childs = toCons(_.childs);
    });
    return this;
  }

  renderRaw({ ctx, formConfig, cons, activateCon, formData }) {
    return (
      <div>
        <el-collapse
          model-value={this.activeNames}
          onChange={(_) => {
            this.activeNames = _;
          }}
          accordion={this.collapseProps.accordion}
        >
          {this.collapses.map((_, i) => {
            return (
              <el-collapse-item key={_.key} title={_.title} name={i}>
                {formData ? (
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
              </el-collapse-item>
            );
          })}
        </el-collapse>
      </div>
    );
  }

  getRight(op, hasEditor = true) {
    let _ = super.getRight(...arguments);
    hasEditor &&
      _.find((_) => _.title == "常用属性").childs.unshift(
        ...[
          {
            label: "手风琴模式",
            editor: (
              <el-switch
                size="small"
                model-value={this.collapseProps.accordion}
                onChange={(v) => {
                  this.collapseProps.accordion = v;
                }}
              ></el-switch>
            ),
          },
          {
            label: "选项设置：",
          },
          {
            editor: (
              <div class="controls__ collapse-right">
                <Draggable
                  class="draggable"
                  modelValue={this.collapses}
                  onUpdate:modelValue={(_) => {
                    this.collapses = [..._];
                  }}
                  animation={draggableC.animation}
                  handle=".drag-handler"
                  item-key="key"
                >
                  {{
                    item: ({ element: _ }) => {
                      return (
                        <div class="i">
                          <el-input
                            size="small"
                            model-value={_.title}
                            onInput={(v) => {
                              _.title = v;
                            }}
                          />
                          <el-icon class="drag-handler">
                            <Rank />
                          </el-icon>
                          <el-icon
                            class="remove"
                            onClick={() => {
                              let i = this.collapses.findIndex(
                                (__) => _.key == __.key
                              );
                              if (i >= 0) {
                                this.collapses.splice(i, 1);
                              }
                            }}
                          >
                            <CircleClose />
                          </el-icon>
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
                    this.collapses.push({
                      key: BaseCon.getHash(),
                      title: "Collapse" + (this.collapses.length + 1),
                      childs: [],
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
